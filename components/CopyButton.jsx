
const CopyButton = ({ handleCopy, isCopied }) => {
  return (
    <div className="copy_btn" onClick={handleCopy}>
      <Image
        src={
          isCopied
            ? "/assets/icons/tick.svg"
            : "/assets/icons/copy.svg"
        }
        width={12}
        height={12}
      />
    </div>
  );
};

export default CopyButton;
