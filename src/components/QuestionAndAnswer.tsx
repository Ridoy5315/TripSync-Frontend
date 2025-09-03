import { PlusIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

const items = [
  {
    id: "1",
    title: "How do I book a ride with TripSync?",
    content:
      "Booking is simple! Just log into your account, select your pickup and drop-off locations, choose your preferred ride type, and confirm. You’ll be matched with a nearby verified driver instantly.",
  },
  {
    id: "2",
    title: "How do I know my driver is safe and verified?",
    content: "All TripSync drivers go through a strict verification process, including identity checks, driving record reviews, and safety training. You’ll see your driver’s profile, rating, and vehicle details before the ride starts.Í" },
  {
    id: "3",
    title: "What payment methods are accepted?",
    content: "We support multiple payment options including credit/debit cards, mobile wallets, and TripSync credits. No hidden charges—only transparent fares." },
  {
    id: "4",
    title: "How are fares calculated?",
    content: "Fares are based on distance, time, and demand. Before confirming your booking, you’ll always see the estimated cost." },
  {
    id: "5",
    title: "What happens if I need to cancel a ride?",
    content: "You can cancel a ride before it begins. We always keep it fair and transparent." },
  {
    id: "6",
    title: "How do drivers earn with TripSync?",
    content: "Drivers earn flexible income by accepting rides at their convenience. Payments are processed quickly and securely, with detailed earnings reports available in the Fare Details Menu." },
  {
    id: "7",
    title: "What should I do if I left an item in the car?",
    content: "Don’t worry! You can report a lost item through the app, and we’ll connect you directly with your driver to arrange its return." },
];

export default function QuestionAndAnswer() {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full" defaultValue="3">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2">
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                {item.title}
                <PlusIcon
                  size={16}
                  className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                  aria-hidden="true"
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="text-muted-foreground pb-2">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
