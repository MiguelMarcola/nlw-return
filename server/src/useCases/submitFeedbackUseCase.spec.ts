import { SubmitFeedbacksUseCase } from "./submitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbacksUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe("submit feedback", () => {
    it("shoud be able to subit a feedback", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "exemple comment",
            screenshot: "data:image/png;base64,adhaipshfdkjasbdfiwhcasb",
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it("shoud not be able to subit a feedback without type", async () => {
        await expect(submitFeedback.execute({
            type: "",
            comment: "exemple comment",
            screenshot: "data:image/png;base64,adhaipshfdkjasbdfiwhcasb",
        })).rejects.toThrow();
    });

    it("shoud not be able to subit a feedback without comment", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image/png;base64,adhaipshfdkjasbdfiwhcasb",
        })).rejects.toThrow();
    });

    it("shoud not be able to subit a feedback with an inavalid screenshot", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "exemple comment",
            screenshot: "test.jpg",
        })).rejects.toThrow();
    });
})

