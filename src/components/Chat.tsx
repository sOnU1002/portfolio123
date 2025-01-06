import { useChatbot } from "@/contexts/ChatContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion";

export default function Chat() {
  const { isVisible } = useChatbot();

  return (
    isVisible && (
      <Accordion type="single" collapsible className="relative z-40 flexs">
        <AccordionItem
          value="item-1"
          className="fixed bottom-8 right-8 w-80 rounded-md border bg-background"
        >
          <AccordionTrigger className="border-b px-6">
            <div className="text-center py-4">Chat</div>
          </AccordionTrigger>
          <AccordionContent className="flex max-h-96 min-h-80 flex-col justify-center items-center p-4">
            <div className="text-lg font-semibold">Coming Soon</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  );
}