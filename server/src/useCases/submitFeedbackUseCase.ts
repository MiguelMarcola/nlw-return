import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbackRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbacksUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbacksUseCase {
    constructor(
        private feedbacksRepository: FeedbackRepository,
        private mainAdapter: MailAdapter,
    ) {}

    async execute(request: SubmitFeedbacksUseCaseRequest) {
        const { type, comment, screenshot } = request;

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        });

        await this.mainAdapter.sendMain({
            subject: "Novo feedback",
            body: [
                `<div style="font-family: sasns-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`
            ].join("\n")
        })
    }

}