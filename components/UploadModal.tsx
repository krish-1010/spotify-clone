"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const onChange = (open: boolean) => {
    if (!open) {
      uploadModal.onClose();
    }
  };
  return (
    <Modal
      title="Add a song"
      description="upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      upload content
    </Modal>
  );
};

export default UploadModal;
