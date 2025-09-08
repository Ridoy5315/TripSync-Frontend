import QuestionAndAnswer from "../QuestionAndAnswer";

export default function FAQs() {
  return (
    <div className="lg:mt-28 mt-10 mb-44 lg:px-0 md:px-8 px-6 container mx-auto grid lg:grid-cols-2 grid-cols-1 lg:gap-20 gap-10 items-center">
      <div className="lg:space-y-6. md:space-y-6 space-y-4">
        <h5 className="lg:text-2xl md:text-2xl text-xl text-pretty font-semibold text-primary">
          Questions & Answers
        </h5>
        <h2 className="lg:text-6xl md:text-6xl text-4xl text-pretty font-bold lg:leading-16 md:leading-16 leading-12">
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
