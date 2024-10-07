

interface EmbedModalProps {
        open: boolean;
        setIsOpen: (open: boolean) => void;
}

const EmbedModal = (props:EmbedModalProps) => {
    const { open, setIsOpen } = props;
  

  const toggleModal = () => {
    setIsOpen(!open);
  };

  return (
    <>
      

      {/* Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={toggleModal}
        >
          {/* Modal Content */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent closing on content click
          >
            <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
            <p className="text-gray-600 mb-4">
              This is the modal content. You can add more components or text
              here.
            </p>
            <button
              className="px-4 py-2 text-white bg-red-500 rounded-md"
              onClick={toggleModal}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EmbedModal;
