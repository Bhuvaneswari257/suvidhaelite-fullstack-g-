export default function SupportProfessionalAssistance() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#1F2933]">
        Professional Assistance
      </h1>

      <p className="text-gray-600">
        Help service providers resolve platform issues.
      </p>

      <h2 className="font-semibold text-lg">Professional Problems & Solutions</h2>

      <div className="space-y-4 text-gray-700">

        <div>
          <b>Problem:</b> Professional not receiving bookings  
          <br/>
          <b>Solution:</b> Check listing visibility → verify approval → fix category placement.
        </div>

        <div>
          <b>Problem:</b> Unable to update profile  
          <br/>
          <b>Solution:</b> Reset permissions → refresh account → update manually.
        </div>

        <div>
          <b>Problem:</b> Payment settlement delayed  
          <br/>
          <b>Solution:</b> Verify payout schedule → release payment → notify provider.
        </div>

        <div>
          <b>Problem:</b> Customer complaint against professional  
          <br/>
          <b>Solution:</b> Investigate case → warn or suspend → mediate resolution.
        </div>

      </div>
    </div>
  );
}