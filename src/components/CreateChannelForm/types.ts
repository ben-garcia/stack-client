export interface CreateChannelFormProps {
  createChannelFormIsOpen: (state: boolean) => void;
  modalId?: string;
}

export interface Channel {
  name: string;
  description: string;
  private: boolean;
}

export interface ChannelErrors {
  name: string;
  description: string;
}
