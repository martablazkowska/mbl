import { IFaq, IFaqService } from "server/models/faq";
import { faqData } from "server/data/faq";
import {
  IGlobalInstance,
  initializeService,
} from "server/utils/initializeService";

class FaqService implements IFaqService {
  constructor(private faq: IFaq[]) {}

  getFaqList() {
    return this.faq;
  }
}

const globalFaq = global as unknown as IGlobalInstance<FaqService>;

const faq = initializeService(FaqService, faqData, globalFaq, "faq");

export default faq;
