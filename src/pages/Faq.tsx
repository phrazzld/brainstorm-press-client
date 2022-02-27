import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

const questions = [
    {
        question: "What is Brainstorm Press?",
        answer:
            "Brainstorm Press is a blogging platform. You can read and write posts, and subscribe to users.",
    },
    {
        question: "What are premium posts?",
        answer:
            "Premium posts are locked unless you have a Premium Pass for the author.",
    },
    {
        question: "What is a Premium Pass?",
        answer:
            "When you purchase a Premium Pass for an author, you get unlimited access to their premium posts for thirty days. Authors set their own price for their Premium Passes.",
    },
    {
        question: "How do I purchase a Premium Pass?",
        answer:
            "If you try to read a premium post and you don't have an active Premium Pass for the author, you will be shown a Lightning invoice. Paying that invoice will buy you a thirty day Premium Pass for the author of the post you were trying to read.",
    },
    {
        question: "Do I need bitcoin to use Brainstorm Press?",
        answer:
            "You can write as much as you want, and read all the free posts you like, without any bitcoin. In order to access premium posts, you will need some bitcoin to buy Premium Passes.",
    },
    {
        question: "Do I need a Lightning node to use Brainstorm Press?",
        answer:
            "You only need a Lightning node if you are publishing premium posts. Every time a user purchases your Premium Pass, their payment goes directly to your node.",
    },
    {
        question: "How do I report bugs or suggest features?",
        answer: "Feel free to open an issue on our GitHub.",
    },
];

export const Faq = () => {
    return (
        <Box>
            <Typography variant="h2" gutterBottom>
                FAQ
            </Typography>

            {questions.map((q) => (
                <Accordion key={q.question}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h5" gutterBottom>
                            {q.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body1" gutterBottom>
                            {q.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};
