export default function SupportBookingIssues() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#1F2933]">
        Booking Issues
      </h1>

      <p className="text-gray-600">
        Handle cancellations and scheduling conflicts.
      </p>

      <h2 className="font-semibold text-lg">Booking Conflicts & Direct Solutions</h2>

      <div className="space-y-4 text-gray-700">

        <div>
          <b>Problem:</b> Professional unavailable after booking  
          <br/>
          <b>Solution:</b> Offer reschedule → suggest alternate professional → allow full refund.
        </div>

        <div>
          <b>Problem:</b> User booked wrong date/time  
          <br/>
          <b>Solution:</b> Modify booking if slot free → otherwise cancel and rebook.
        </div>

        <div>
          <b>Problem:</b> Duplicate booking created  
          <br/>
          <b>Solution:</b> Cancel extra booking → refund duplicate payment.
        </div>

        <div>
          <b>Problem:</b> Professional did not show up  
          <br/>
          <b>Solution:</b> Mark service failed → compensate user → warn professional.
        </div>

        <div>
          <b>Problem:</b> User did not show up  
          <br/>
          <b>Solution:</b> Apply no-show policy → partial refund if eligible.
        </div>

      </div>
    </div>
  );
}