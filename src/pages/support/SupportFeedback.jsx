export default function SupportFeedback() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#1F2933]">
        Feedback Monitoring
      </h1>

      <p className="text-gray-600">
        Review ratings and customer feedback.
      </p>

      <h2 className="font-semibold text-lg">Feedback Cases & Actions</h2>

      <div className="space-y-4 text-gray-700">

        <div>
          <b>Problem:</b> Professional receiving repeated low ratings  
          <br/>
          <b>Solution:</b> Review performance → issue warning → require improvement.
        </div>

        <div>
          <b>Problem:</b> Customer reports poor service quality  
          <br/>
          <b>Solution:</b> Investigate → compensate if valid → flag provider.
        </div>

        <div>
          <b>Problem:</b> Fake or abusive review  
          <br/>
          <b>Solution:</b> Verify authenticity → remove review if policy violated.
        </div>

      </div>
    </div>
  );
}