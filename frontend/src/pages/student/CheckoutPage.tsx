export function CheckoutPage() {
  return (
    <section>
      <h2>Checkout</h2>
      <div className="card stack-gap">
        <label>
          Coupon
          <input placeholder="SAVE10" />
        </label>
        <label>
          Payment mode
          <select>
            <option>One-time payment</option>
            <option>3-month installment</option>
          </select>
        </label>
        <button className="btn-primary" type="button">
          Pay with Razorpay (UPI/Card/Netbanking/Wallet)
        </button>
      </div>
    </section>
  );
}
