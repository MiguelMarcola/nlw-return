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

        if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error("invalid screenshot format.")
        }

        if (!type) {
            throw new Error("Type is required.")
        }

        if (!comment) {
            throw new Error("Coment is required.")
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        });

        await this.mainAdapter.sendMail({
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