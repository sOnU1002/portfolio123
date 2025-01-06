import { useChatbot } from "@/contexts/ChatContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion";

export default function Chat() {
  const { isVisible } = useChatbot();

  const handleResumeDownload = () => {
    // Replace with the actual resume URL
    const resumeURL = "/path/to/your/resume.pdf";
    const link = document.createElement("a");
    link.href = resumeURL;
    link.download = "Resume.pdf";
    link.click();
  };

  return (
    isVisible && (
      <Accordion
        type="single"
        collapsible
        className="relative z-40"
      >
        <AccordionItem
          value="chat"
          className="fixed bottom-8 right-8 w-72 rounded-md border bg-background shadow-lg"
        >
          <AccordionTrigger className="border-b px-4 py-2 text-center">
            <div className="text-base font-semibold">Chat</div>
          </AccordionTrigger>
          <AccordionContent className="flex max-h-80 min-h-64 flex-col justify-between items-center p-4 space-y-4">
            <div className="text-sm text-gray-700">
              "Coming soon! For now, please download my resume."
            </div>
            <button
              onClick={handleResumeDownload}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Download Resume
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  );
}
