import { fireEvent, render, screen } from "@testing-library/react";
import { CreateNewPostForm } from "./CreateNewPostForm";

describe("<CreateNewPostForm />", () => {
    beforeEach(() => {
        render(<CreateNewPostForm />);
    });

    describe("presence", () => {
        it("should render the form", () => {
            // heading
            expect(screen.getByText(/create new post/i)).toBeInTheDocument();
            // inputs
            expect(screen.getByText(/title/i)).toBeInTheDocument();
            expect(screen.getByText(/write something/i)).toBeInTheDocument();
            expect(screen.getByText(/premium/i)).toBeInTheDocument();
            // buttons
            expect(screen.getByText(/publish/i)).toBeInTheDocument();
            expect(screen.getByText(/save draft/i)).toBeInTheDocument();
            expect(screen.getByText(/cancel/i)).toBeInTheDocument();
        });
    });

    describe("behavior", () => {
        describe("authenticated", () => {
            it("should change title when input is typed into", () => {
                const titleInput = screen.getByLabelText(
                    /title/i
                ) as HTMLInputElement;
                fireEvent.change(titleInput, { target: { value: "test" } });
                expect(titleInput.value).toBe("test");
            });

            test.todo("should change content when input is typed into");

            test.todo("should toggle premium switch on click");

            test.todo("should publish post when 'Publish' button is clicked");

            test.todo("should save draft when 'Save Draft' button is clicked");

            test.todo(
                "should cancel post creation and redirect home when 'Cancel' button is clicked"
            );
        });

        describe("unauthenticated", () => {
            test.todo("should not render form");

            test.todo("should prompt user to log in");
        });
    });
});
