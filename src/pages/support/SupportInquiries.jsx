export default function SupportInquiries() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#1F2933]">
        User Inquiries
      </h1>

      <p className="text-gray-600">
        Respond to customer questions and concerns related to services,
        bookings, accounts, and platform usage.
      </p>

      <h2 className="font-semibold text-lg">Common User Issues & Solutions</h2>

      <div className="space-y-4 text-gray-700">

        <div>
          <b>Problem:</b> User cannot log into account  
          <br/>
          <b>Solution:</b> Verify credentials → reset password → unlock account if blocked.
        </div>

        <div>
          <b>Problem:</b> Booking confirmation not received  
          <br/>
          <b>Solution:</b> Check booking status → resend confirmation → verify payment success.
        </div>

        <div>
          <b>Problem:</b> Professional not visible in search  
          <br/>
          <b>Solution:</b> Refresh service listing → verify category → check location filters.
        </div>

        <div>
          <b>Problem:</b> Incorrect service price shown  
          <br/>
          <b>Solution:</b> Validate provider pricing → correct listing → notify user.
        </div>

        <div>
          <b>Problem:</b> App or platform confusion  
          <br/>
          <b>Solution:</b> Guide user step-by-step with instructions or screenshots.
        </div>

      </div>
    </div>
  );
}