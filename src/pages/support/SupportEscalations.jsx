export default function SupportEscalations() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#1F2933]">
        Escalations
      </h1>

      <p className="text-gray-600">
        Manage high-priority complaints requiring admin intervention.
      </p>

      <h2 className="font-semibold text-lg">Escalation Cases & Direct Resolution</h2>

      <div className="space-y-4 text-gray-700">

        <div>
          <b>Fraud or payment risk</b>  
          <br/>
          Solution → Freeze transaction → verify identity → refund or block account.
        </div>

        <div>
          <b>Legal complaints</b>  
          <br/>
          Solution → Collect documentation → forward to legal/admin → suspend service if required.
        </div>

        <div>
          <b>Repeated service failure</b>  
          <br/>
          Solution → Investigate provider → temporary suspension → reassign customers.
        </div>

        <div>
          <b>Policy violations</b>  
          <br/>
          Solution → Issue warning → restrict account → permanent ban if severe.
        </div>

        <div>
          <b>Customer safety concerns</b>  
          <br/>
          Solution → Immediate investigation → suspend professional → emergency escalation.
        </div>

      </div>
    </div>
  );
}