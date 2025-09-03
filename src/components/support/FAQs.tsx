import QuestionAndAnswer from "../QuestionAndAnswer";

export default function FAQs() {
  return (
    <div className="mt-28 mb-44 container mx-auto grid grid-cols-2 gap-20 items-center">
      <div className="space-y-6">
        <h5 className="text-2xl text-pretty font-semibold text-primary">
          Questions & Answers
        </h5>
        <h2 className="text-6xl text-pretty font-bold leading-16">
          Got Questions? We’ve Got Answers.
        </h2>
        <p className="text-muted-foreground leading-6">
          Whether you’re a rider planning a trip or a driver exploring
          opportunities, our FAQ section provides quick and clear answers about
          TripSync’s services, pricing, safety, and more. Find the information
          you need in seconds.
        </p>
      </div>
      <div>
        <QuestionAndAnswer></QuestionAndAnswer>
      </div>
    </div>
  );
}
