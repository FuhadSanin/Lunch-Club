import { useState } from 'react';
import { toast } from 'sonner';
import { useOrderDelivered, useOrderPlaced } from '@/api/queries';
import type { ApiOrder, ApiOrderStatus } from '@/api/types';
import { rupees } from '@/ui';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const STATUS: Record<ApiOrderStatus, { label: string; variant: 'secondary' | 'warning' | 'success' }> = {
  pending: { label: 'Waiting', variant: 'secondary' },
  placing: { label: 'Placing', variant: 'warning' },
  needs_host: { label: 'Needs you', variant: 'warning' },
  placed: { label: 'Placed', variant: 'success' },
  delivered: { label: 'Arrived', variant: 'success' },
};

// The lunch's Swiggy checkouts from the API. Picks lock into one checkout per five restaurants; until
// the order bot ships, the host checks out in the Swiggy app and enters each order's number here.
export function SwiggyOrders({ orders }: { orders: ApiOrder[] }) {
  const done = orders.filter((o) => o.status === 'placed' || o.status === 'delivered').length;
  return (
    <Card aria-labelledby="orders-h">
      <CardHeader>
        <CardTitle id="orders-h">Swiggy orders</CardTitle>
        {orders.length > 0 && (
          <CardAction>
            <Badge variant={done === orders.length ? 'success' : 'secondary'}>{done}/{orders.length} placed</Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        {orders.length ? (
          <ul className="grid gap-3">
            {orders.map((o) => <OrderRow key={o.id} order={o} />)}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            They appear when picks lock: the cart is split into Swiggy checkouts, then you confirm it and they go out.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function OrderRow({ order }: { order: ApiOrder }) {
  const [number, setNumber] = useState('');
  const placed = useOrderPlaced();
  const delivered = useOrderDelivered();
  const s = STATUS[order.status];
  const fieldId = `swiggy-${order.id}`;

  return (
    <li className="rounded-xl p-3 shadow-ring">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium">{order.restaurants.join(', ')}</div>
          <div className="text-[13px] text-muted-foreground num">
            {order.restaurant_count} {order.restaurant_count === 1 ? 'restaurant' : 'restaurants'} · {rupees(order.total_paise / 100)}
            {order.swiggy_order_id && <> · #{order.swiggy_order_id}</>}
          </div>
        </div>
        <Badge variant={s.variant}>{s.label}</Badge>
      </div>
      {order.last_error && <p className="mt-2 text-[13px] text-warn">{order.last_error}</p>}

      {(order.status === 'needs_host' || order.status === 'pending') && (
        <form
          className="mt-3 grid gap-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            placed.mutate(
              { orderId: order.id, swiggyOrderId: number.trim() },
              {
                onSuccess: () => toast.success('Order number saved'),
                onError: (err) => toast.error("Couldn't save the order number", { description: err.message }),
              },
            );
          }}
        >
          <Label htmlFor={fieldId} className="text-[13px]">Swiggy order number</Label>
          <div className="flex gap-2">
            <Input id={fieldId} value={number} onChange={(e) => setNumber(e.target.value)} placeholder="From the Swiggy app, e.g. 184220973" autoComplete="off" className="h-9" />
            <Button type="submit" size="sm" className="h-9" disabled={!number.trim() || placed.isPending}>
              {placed.isPending ? 'Saving…' : 'Save'}
            </Button>
          </div>
        </form>
      )}

      {order.status === 'placed' && (
        <Button
          size="sm"
          variant="outline"
          className="mt-3"
          disabled={delivered.isPending}
          onClick={() => delivered.mutate(order.id, { onError: (err) => toast.error("Couldn't mark it as arrived", { description: err.message }) })}
        >
          Mark as arrived
        </Button>
      )}
    </li>
  );
}
