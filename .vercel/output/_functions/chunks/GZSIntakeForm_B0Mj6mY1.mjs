import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState } from 'react';
import { c as cn, B as Button } from './toaster_Br8Fs97V.mjs';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { motion, AnimatePresence } from 'framer-motion';

const Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      CheckboxPrimitive.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" })
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const questions = [
  {
    question: "What is your name?",
    type: "text",
    name: "Name",
    required: true
  },
  {
    question: "What is your email address?",
    type: "email",
    name: "Email",
    required: true
  },
  {
    question: "What is your organization or family office?",
    type: "text",
    name: "Organization",
    required: true
  },
  {
    question: "What is your role?",
    type: "text",
    name: "Role",
    required: true
  },
  {
    question: "This application is being submitted by:",
    type: "select",
    name: "Submitted By",
    required: true,
    options: [
      "Family principal/decision-maker",
      "Family office representative",
      "External advisor (legal, financial, etc.)",
      "Other"
    ]
  },
  {
    question: "What's prompting this analysis?",
    type: "multiselect",
    name: "What's Happening",
    required: true,
    options: [
      "Standard advisors are missing something critical",
      "Protective systems may have become vulnerabilities",
      "Patterns are sensed but can't be identified",
      "Previous solutions have made the situation worse",
      "Other"
    ]
  },
  {
    question: "Which areas are you most concerned about?",
    type: "multiselect",
    name: "Areas of Concern",
    required: true,
    options: [
      "Advisory relationships and governance",
      "Family dynamics and communication",
      "Cross-border operations and complexity",
      "Succession planning and transitions",
      "Other"
    ]
  },
  {
    question: "What's the potential impact if current patterns continue?",
    type: "multiselect",
    name: "Potential Impact",
    required: true,
    options: [
      "€10-50M in systematic exposure",
      "€50M+ in legacy-threatening impact",
      "Multi-generational control implications",
      "Reputation damage beyond financial calculation",
      "Other"
    ]
  },
  {
    question: "How did you first realize you might need a different approach?",
    type: "multiselect",
    name: "Realization",
    required: true,
    options: [
      "Recognized something wasn't quite right through observation",
      "Trusted advisor suggested we get a fresh perspective",
      "Previous incident made us realize we needed different expertise",
      "Research into similar situations revealed gaps in our approach",
      "Other"
    ]
  },
  {
    question: "What's driving the timing on this?",
    type: "select",
    name: "Timing",
    required: true,
    options: [
      "Immediate situation requiring urgent attention",
      "Strategic priority we want to address soon",
      "Important but not time-sensitive",
      "Just beginning to explore options"
    ]
  },
  {
    question: "What's been your experience with traditional solutions on this type of issue?",
    type: "multiselect",
    name: "Already Tried",
    required: true,
    options: [
      "They can't identify the sophisticated patterns we're seeing",
      "Multiple providers giving conflicting analysis",
      "They treat symptoms but miss the underlying system",
      "We haven't tried traditional approaches for this issue yet"
    ]
  }
];
const GZSIntakeForm = ({ onComplete, isModal = false }) => {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [otherTexts, setOtherTexts] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const handlePrev = () => {
    if (currentQuestion > -1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  const handleChange = (name, value) => {
    setAnswers({ ...answers, [name]: value });
  };
  const handleOtherTextChange = (questionName, text) => {
    setOtherTexts({ ...otherTexts, [questionName]: text });
    const currentValues = answers[questionName];
    if (currentValues) {
      if (Array.isArray(currentValues)) {
        if (currentValues.includes("Other") || currentValues.some((v) => v.startsWith("Other: "))) {
          const withoutOther = currentValues.filter((v) => v !== "Other" && !v.startsWith("Other: "));
          const newValues = text ? [...withoutOther, `Other: ${text}`] : [...withoutOther, "Other"];
          handleChange(questionName, newValues);
        }
      } else {
        if (currentValues === "Other" || currentValues.startsWith("Other: ")) {
          const newValue = text ? `Other: ${text}` : "Other";
          handleChange(questionName, newValue);
        }
      }
    }
  };
  const handleSelectChange = (name, value) => {
    if (value === "Other" && otherTexts[name]) {
      handleChange(name, `Other: ${otherTexts[name]}`);
    } else {
      handleChange(name, value);
      if (value !== "Other") {
        setOtherTexts({ ...otherTexts, [name]: "" });
      }
    }
  };
  const handleMultiSelectChange = (name, option, checked) => {
    const currentValues = answers[name] || [];
    if (checked) {
      if (!currentValues.includes(option)) {
        let newValues = [...currentValues, option];
        if (option === "Other" && otherTexts[name]) {
          newValues = newValues.filter((v) => v !== "Other");
          newValues.push(`Other: ${otherTexts[name]}`);
        }
        handleChange(name, newValues);
      }
    } else {
      const filteredValues = currentValues.filter(
        (item) => item !== option && !item.startsWith("Other: ")
      );
      handleChange(name, filteredValues);
      if (option === "Other") {
        setOtherTexts({ ...otherTexts, [name]: "" });
      }
    }
  };
  const isCurrentQuestionAnswered = () => {
    if (currentQuestion === -1) return true;
    const currentQ = questions[currentQuestion];
    const answer = answers[currentQ.name];
    if (!currentQ.required) return true;
    if (currentQ.type === "multiselect") {
      return answer && Array.isArray(answer) && answer.length > 0;
    }
    return answer && answer.trim() !== "" && answer.length > 0;
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(answers)
      });
      const result = await response.json();
      if (result.success) {
        console.log("Form submitted successfully to Notion:", result.id);
        setSubmitted(true);
      } else {
        console.error("Form submission failed:", result.error);
        alert("Form submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Form submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const progress = currentQuestion > -1 ? (currentQuestion + 1) / (questions.length + 1) * 100 : 0;
  if (submitted) {
    return /* @__PURE__ */ jsx("div", { className: isModal ? "w-full flex items-center justify-center py-12" : "min-h-screen w-full flex items-center justify-center px-6 py-12", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" },
        className: "text-center space-y-12 max-w-4xl mx-auto",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-px bg-foreground/20 mx-auto" }),
            /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-light leading-[0.9] text-foreground", children: "Application Submitted" }),
            /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg font-light leading-relaxed text-foreground/80 max-w-xl mx-auto", children: "Your application is being reviewed. Our evaluation process ensures optimal engagement alignment. You will be contacted within 48-72 hours regarding your qualification status." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-8", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-3 text-sm font-light tracking-widest uppercase text-foreground/60", children: [
            /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-primary rounded-full animate-pulse" }),
            /* @__PURE__ */ jsx("span", { children: "Application Under Review" })
          ] }) })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsx("div", { className: isModal ? "w-full flex flex-col" : "min-h-screen w-full flex flex-col", children: /* @__PURE__ */ jsxs("div", { className: isModal ? "flex flex-col" : "flex-1 flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full bg-background/95 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsx(Progress, { value: progress, className: "mb-2" }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-xs font-light tracking-widest uppercase text-foreground/60", children: [
        /* @__PURE__ */ jsx("span", { children: "Legacy Ecosystem Analysis Application" }),
        /* @__PURE__ */ jsxs("span", { children: [
          Math.round(progress),
          "%"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: isModal ? "flex flex-col justify-start px-4 sm:px-6 pt-4" : "flex-1 flex flex-col justify-start px-4 sm:px-6 pt-8", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-3xl mx-auto my-10", children: [
      /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
        currentQuestion === -1 && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: { duration: 0.8, ease: "easeOut" },
            className: "text-center space-y-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsx("div", { className: "w-16 h-px bg-foreground/20 mx-auto" }),
                /* @__PURE__ */ jsxs("h1", { className: "text-2xl sm:text-3xl md:text-4xl font-light leading-tight text-foreground", children: [
                  "Legacy Ecosystem",
                  /* @__PURE__ */ jsx("span", { className: "block", children: "Analysis Application" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg font-light leading-relaxed text-foreground/80 max-w-xl mx-auto", children: "This confidential analysis reveals exactly how relationships and systems affect your legacy - and how to optimize authentic control." }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: () => setCurrentQuestion(0),
                  variant: "outline",
                  size: "lg",
                  className: "font-light text-base px-12 py-3 h-auto border-2 border-foreground/20 bg-transparent text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:neumorphic-hover-light hover:dark:neumorphic-hover-dark transition-[border-color,background-color,color,transform,box-shadow] duration-300 ease-in-out rounded-full",
                  children: "Begin Application"
                }
              )
            ]
          },
          "welcome"
        ),
        currentQuestion > -1 && currentQuestion < questions.length && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -30 },
            transition: { duration: 0.8, ease: "easeOut" },
            className: "space-y-4 py-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6", children: [
                /* @__PURE__ */ jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxs("div", { className: "text-sm font-light tracking-widest uppercase text-foreground/60", children: [
                  "Question ",
                  currentQuestion + 1,
                  " of ",
                  questions.length
                ] }) }),
                /* @__PURE__ */ jsx("label", { htmlFor: questions[currentQuestion].name, className: "text-xl sm:text-2xl md:text-3xl font-light leading-tight text-foreground block", children: questions[currentQuestion].question })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-2xl", children: [
                questions[currentQuestion].type === "text" && /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: questions[currentQuestion].name,
                    type: "text",
                    className: "w-full p-3 sm:p-4 text-base sm:text-lg font-light text-left bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:ring-0 transition-all duration-300",
                    onChange: (e) => handleChange(questions[currentQuestion].name, e.target.value),
                    value: answers[questions[currentQuestion].name] || "",
                    autoFocus: true
                  }
                ),
                questions[currentQuestion].type === "email" && /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: questions[currentQuestion].name,
                    type: "email",
                    className: "w-full p-3 sm:p-4 text-base sm:text-lg font-light text-left bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:ring-0 transition-all duration-300",
                    onChange: (e) => handleChange(questions[currentQuestion].name, e.target.value),
                    value: answers[questions[currentQuestion].name] || "",
                    autoFocus: true
                  }
                ),
                questions[currentQuestion].type === "select" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs(Select, { onValueChange: (value) => handleSelectChange(questions[currentQuestion].name, value), value: answers[questions[currentQuestion].name]?.startsWith("Other: ") ? "Other" : answers[questions[currentQuestion].name] || "", children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full p-3 sm:p-4 text-base sm:text-lg font-light bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:ring-0 transition-all duration-300", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select an option", className: "font-light" }) }),
                    /* @__PURE__ */ jsx(SelectContent, { className: "bg-background border border-foreground/20", children: questions[currentQuestion].options?.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option, className: "text-base sm:text-lg font-light hover:bg-secondary/30 p-3", children: option }, option)) })
                  ] }),
                  (answers[questions[currentQuestion].name] === "Other" || answers[questions[currentQuestion].name]?.startsWith("Other: ")) && /* @__PURE__ */ jsx(
                    Input,
                    {
                      type: "text",
                      placeholder: "Please specify...",
                      className: "w-full p-3 sm:p-4 text-base sm:text-lg font-light bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:ring-0 transition-all duration-300",
                      value: otherTexts[questions[currentQuestion].name] || "",
                      onChange: (e) => handleOtherTextChange(questions[currentQuestion].name, e.target.value)
                    }
                  )
                ] }),
                questions[currentQuestion].type === "multiselect" && /* @__PURE__ */ jsx("div", { className: "space-y-4", children: questions[currentQuestion].options?.map((option) => {
                  const currentValues = answers[questions[currentQuestion].name] || [];
                  const isOtherSelected = option === "Other" && (currentValues.includes("Other") || currentValues.some((v) => v.startsWith("Other: ")));
                  const isRegularSelected = option !== "Other" && currentValues.includes(option);
                  const isChecked = isOtherSelected || isRegularSelected;
                  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 p-3 sm:p-4 bg-secondary/10 hover:bg-secondary/20 border border-foreground/10 rounded-lg transition-all duration-300", children: [
                      /* @__PURE__ */ jsx(
                        Checkbox,
                        {
                          id: `${questions[currentQuestion].name}-${option}`,
                          checked: isChecked,
                          onCheckedChange: (checked) => handleMultiSelectChange(questions[currentQuestion].name, option, checked),
                          className: "data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "label",
                        {
                          htmlFor: `${questions[currentQuestion].name}-${option}`,
                          className: "text-base font-light text-foreground cursor-pointer flex-1",
                          children: option
                        }
                      )
                    ] }),
                    option === "Other" && isOtherSelected && /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "text",
                        placeholder: "Please specify...",
                        className: "w-full p-3 sm:p-4 text-base sm:text-lg font-light bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:ring-0 transition-all duration-300 ml-0",
                        value: otherTexts[questions[currentQuestion].name] || "",
                        onChange: (e) => handleOtherTextChange(questions[currentQuestion].name, e.target.value)
                      }
                    )
                  ] }, option);
                }) })
              ] }) })
            ]
          },
          currentQuestion
        ),
        currentQuestion === questions.length && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -30 },
            transition: { duration: 0.8, ease: "easeOut" },
            className: "space-y-12",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center space-y-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-16 h-px bg-foreground/20 mx-auto" }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-light tracking-widest uppercase text-foreground/60", children: "Final Review" })
                ] }),
                /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl md:text-3xl font-light leading-tight text-foreground", children: "Review Your Application" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-6 max-w-4xl mx-auto", children: questions.map((q, i) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 bg-secondary/20 border border-foreground/10 rounded-lg hover:bg-secondary/30 hover:neumorphic-hover-card hover:dark:neumorphic-hover-card-dark transition-all duration-300", children: [
                /* @__PURE__ */ jsx("p", { className: "font-light text-foreground/80 text-base", children: q.question }),
                /* @__PURE__ */ jsx("div", { className: "text-foreground font-light text-base lg:text-right", children: q.type === "multiselect" ? /* @__PURE__ */ jsx("div", { className: "space-y-1", children: (answers[q.name] || []).length > 0 ? (answers[q.name] || []).map((item, idx) => /* @__PURE__ */ jsxs("div", { children: [
                  "• ",
                  item
                ] }, idx)) : "Not answered" }) : answers[q.name] || "Not answered" })
              ] }, i)) })
            ]
          },
          "review"
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full max-w-2xl mx-auto flex justify-between items-center mt-8 sm:mt-12", children: [
        currentQuestion > -1 ? /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            onClick: handlePrev,
            size: "lg",
            className: "font-light text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 border-2 border-foreground/30 rounded-full min-h-[44px] min-w-[44px] hover:neumorphic-hover-light hover:dark:neumorphic-hover-dark transition-all duration-300",
            children: "Previous"
          }
        ) : /* @__PURE__ */ jsx("div", {}),
        currentQuestion < questions.length - 1 ? /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleNext,
            variant: "outline",
            size: "lg",
            disabled: !isCurrentQuestionAnswered(),
            className: "font-light text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 border-2 border-foreground/30 rounded-full min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed hover:neumorphic-hover-light hover:dark:neumorphic-hover-dark transition-all duration-300",
            children: "Next"
          }
        ) : currentQuestion === questions.length - 1 ? /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleNext,
            variant: "outline",
            size: "lg",
            disabled: !isCurrentQuestionAnswered(),
            className: "font-light text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 border-2 border-foreground/30 rounded-full min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed hover:neumorphic-hover-light hover:dark:neumorphic-hover-dark transition-all duration-300",
            children: "Review"
          }
        ) : /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleSubmit,
            variant: "outline",
            size: "lg",
            disabled: isSubmitting,
            className: "font-light text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 border-2 border-foreground/30 rounded-full min-h-[44px] disabled:opacity-70 disabled:cursor-not-allowed hover:neumorphic-hover-light hover:dark:neumorphic-hover-dark transition-all duration-300",
            children: isSubmitting ? /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" }),
              /* @__PURE__ */ jsx("span", { children: "Processing..." })
            ] }) : "Submit Application"
          }
        )
      ] })
    ] }) })
  ] }) });
};

export { GZSIntakeForm as G };
