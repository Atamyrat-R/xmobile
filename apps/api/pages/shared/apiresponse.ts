export type APIResponse = {
  success?: boolean;
  message?: string;
  data?: object;
  pagination?: {
    currentPage: number;
    sizeOfPage: number;
    maxPage: number;
  };
};
