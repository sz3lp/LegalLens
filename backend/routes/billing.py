"""Stripe billing endpoints scaffold."""

from fastapi import APIRouter

router = APIRouter()

@router.post('/billing/create-checkout-session')
async def create_checkout():
    """Start a Stripe checkout session (placeholder)."""
    return {"url": "https://stripe.com/checkout-session"}

@router.post('/billing/webhook')
async def webhook():
    """Handle Stripe webhook events."""
    return {"status": "ok"}

@router.get('/billing/usage/{user_id}')
async def usage(user_id: str):
    """Return usage data for user."""
    return {"user": user_id, "docs": 0}
