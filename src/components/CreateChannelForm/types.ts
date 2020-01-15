export interface CreateChannelFormProps {}

export interface Channel {
  name: string;
  description: string;
  public: boolean;
}

export interface ChannelErrors {
  name: string;
  description: string;
}
