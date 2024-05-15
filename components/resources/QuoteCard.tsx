import QuoteSvg from "@/components/svgs/QuoteSvg";

interface QuoteCardProps {
  text: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ text }) => {
  return (
    <div className="bg-main rounded-xl p-5 text-white text-[18px] flex justify-between items-center gap-1.5">
      {text}
      <QuoteSvg />
    </div>
  );
};

export default QuoteCard;
