import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ChevronLeft, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type SurveyView = "good" | "bad" | null;

const SurveyModal = ({
  showSurveyModal,
  setShowSurveyModal,
}: {
  showSurveyModal: boolean;
  setShowSurveyModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [selectedView, setSelectedView] = useState<SurveyView>(null);

  const renderFeedbackContent = useMemo(() => {
    switch (selectedView) {
      case "good":
        return (
          <div className="space-y-3">
            <p>
              Your feedback is valuable to us. Would you mind taking a moment to
              rate your experience with us today?
            </p>
            <div className="flex gap-2">
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => setSelectedView(null)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <a
                href={"https://forms.gle/yV9mKAK6YmvZYdvU8"}
                target="_blank"
                className="flex flex-1 w-full"
              >
                <Button className="w-full" variant={"outline"}>
                  Rate us
                  <Star className="w-4 h-4 text-primary ml-2" />
                </Button>
              </a>
            </div>
          </div>
        );
      case "bad":
        return (
          <div className="space-y-3">
            <p>
              We apologize for any inconvenience you&apos;ve experienced. Would
              you prefer to continue with a live agent instead?
            </p>
            <div className="flex gap-2">
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => setSelectedView(null)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <a
                href={"https://www.zendesk.com/"}
                target="_blank"
                className="flex flex-1 w-full"
              >
                <Button className="w-full" variant={"outline"}>
                  Yes, bring me there
                </Button>
              </a>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-3">
            <p>
              We would appreciate some feedback to help us improve on our AI
              chatbot assistant.
            </p>
            <div className="flex flex-col gap-2">
              <Button
                variant={"outline"}
                onClick={() => setSelectedView("good")}
              >
                I&apos;m satisfied with the response
                <ThumbsUp className="w-4 h-4 text-emerald-500 ml-2" />
              </Button>
              <Button
                variant={"outline"}
                onClick={() => setSelectedView("bad")}
              >
                I&apos;m dissatisfied with the response
                <ThumbsDown className="w-4 h-4 text-red-500 ml-2" />
              </Button>
            </div>
            <Separator />
            <div className="flex gap-2">
              <Button
                className="w-full"
                variant={"outline"}
                onClick={() => setShowSurveyModal(false)}
              >
                Continue discussion
              </Button>
              <a
                href={"https://www.zendesk.com/"}
                target="_blank"
                className="flex w-full"
              >
                <Button className="w-full" variant={"outline"}>
                  Talk to live agent
                </Button>
              </a>
            </div>
          </div>
        );
    }
  }, [selectedView]);

  return (
    <Dialog
      open={showSurveyModal}
      onOpenChange={() => setShowSurveyModal(!showSurveyModal)}
    >
      <DialogContent>
        <DialogHeader>{renderFeedbackContent}</DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export const useSurveyModal = () => {
  const [showSurveyModal, setShowSurveyModal] = useState(false);

  const SurveyModalCallback = useCallback(() => {
    return (
      <SurveyModal
        showSurveyModal={showSurveyModal}
        setShowSurveyModal={setShowSurveyModal}
      />
    );
  }, [showSurveyModal, setShowSurveyModal]);

  return useMemo(
    () => ({
      setShowSurveyModal,
      SurveyModal: SurveyModalCallback,
    }),
    [setShowSurveyModal, SurveyModalCallback]
  );
};
