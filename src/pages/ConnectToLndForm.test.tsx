import { fireEvent, render, screen } from "@testing-library/react";
import { ConnectToLndForm } from "./ConnectToLndForm";

describe("<ConnectToLndForm />", () => {
    beforeEach(() => {
        render(<ConnectToLndForm />);
    });

    describe("presence", () => {
        it("should render the form", () => {
            expect(screen.getByText("Host")).toBeInTheDocument();
            expect(
                screen.getByText("TLS Certificate (HEX)")
            ).toBeInTheDocument();
            expect(screen.getByText("Macaroon")).toBeInTheDocument();
            expect(screen.getByText("Submit")).toBeInTheDocument();
            expect(screen.getByText("Cancel")).toBeInTheDocument();
        });

        it("should render the command for generating the appropriate macaroon", () => {
            const macaroonCommand =
                "lncli bakemacaroon info:read offchain:read invoices:read invoices:write message:read message:write";
            expect(screen.getByText(macaroonCommand)).toBeInTheDocument();
        });
    });

    describe("behavior", () => {
        it("should change host input value when you type into it", () => {
            const hostInput = screen.getByRole("textbox", {
                name: /host/i,
            }) as HTMLInputElement;
            fireEvent.change(hostInput, {
                target: { value: "localhost:0000" },
            });
            expect(hostInput.value).toBe("localhost:0000");
        });

        it("should change tls certificate input value when you type into it", () => {
            const tlsCertificateInput = screen.getByRole("textbox", {
                name: /tls certificate/i,
            }) as HTMLInputElement;
            fireEvent.change(tlsCertificateInput, {
                target: { value: "0x1234567890" },
            });
            expect(tlsCertificateInput.value).toBe("0x1234567890");
        });

        it("should change macaroon input value when you type into it", () => {
            const macaroonInput = screen.getByRole("textbox", {
                name: /macaroon/i,
            }) as HTMLInputElement;
            fireEvent.change(macaroonInput, {
                target: { value: "0x1234567890" },
            });
            expect(macaroonInput.value).toBe("0x1234567890");
        });

        test.todo("should submit the form when you click the submit button");

        test.todo(
            "should redirect the user to the Settings page when you click the cancel button"
        );
    });
});
