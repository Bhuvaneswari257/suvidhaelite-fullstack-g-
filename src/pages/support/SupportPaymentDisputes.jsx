export default function SupportPaymentDisputes() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#1F2933]">
        Payment Disputes
      </h1>

      <p className="text-gray-600">
        Assist with refunds and billing conflicts.
      </p>

      <h2 className="font-semibold text-lg">Payment Complaints & Solutions</h2>

      <div className="space-y-4 text-gray-700">

        <div>
          <b>Problem:</b> Payment deducted but booking not confirmed  
          <br/>
          <b>Solution:</b> Verify transaction → create booking manually or refund.
        </div>

        <div>
          <b>Problem:</b> Refund not received  
          <br/>
          <b>Solution:</b> Check refund status → reprocess refund → provide timeline.
        </div>

        <div>
          <b>Problem:</b> Charged more than expected  
          <br/>
          <b>Solution:</b> Compare invoice → refund excess → update billing record.
        </div>

        <div>
          <b>Problem:</b> Duplicate payment made  
          <br/>
          <b>Solution:</b> Identify duplicate transaction → refund extra amount.
        </div>

        <div>
          <b>Problem:</b> Service cancelled after payment  
          <br/>
          <b>Solution:</b> Apply cancellation policy → issue full or partial refund.
        </div>

      </div>
    </div>
  );
}