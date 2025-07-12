import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    question: 'What is your name?',
    type: 'text',
    name: 'name',
    required: true,
  },
  {
    question: 'What is your email address?',
    type: 'email',
    name: 'email',
    required: true,
  },
  {
    question: 'What is your organization or family office?',
    type: 'text',
    name: 'organization',
    required: true,
  },
  {
    question: 'What is your role?',
    type: 'text',
    name: 'role',
    required: true,
  },
  {
    question: 'This application is being submitted by:',
    type: 'select',
    name: 'submittedBy',
    required: true,
    options: [
      'Family principal/decision-maker',
      'Family office representative',
      'External advisor (legal, financial, etc.)',
      'Other'
    ],
  },
  {
    question: 'What\'s prompting this analysis?',
    type: 'multiselect',
    name: 'promptingAnalysis',
    required: true,
    options: [
      'Standard advisors are missing something critical',
      'Protective systems may have become vulnerabilities',
      'Patterns are sensed but can\'t be identified',
      'Previous solutions have made the situation worse',
      'Other'
    ],
  },
  {
    question: 'Which areas are you most concerned about?',
    type: 'multiselect',
    name: 'areasOfConcern',
    required: true,
    options: [
      'Advisory relationships and governance',
      'Family dynamics and communication',
      'Cross-border operations and complexity',
      'Succession planning and transitions',
      'Other'
    ],
  },
  {
    question: 'What\'s the potential impact if current patterns continue?',
    type: 'multiselect',
    name: 'potentialImpact',
    required: true,
    options: [
      '€10-50M in systematic exposure',
      '€50M+ in legacy-threatening impact',
      'Multi-generational control implications',
      'Reputation damage beyond financial calculation',
      'Other'
    ],
  },
  {
    question: 'How did you first realize you might need a different approach?',
    type: 'multiselect',
    name: 'realizationMethod',
    required: true,
    options: [
      'Recognized something wasn\'t quite right through observation',
      'Trusted advisor suggested we get a fresh perspective',
      'Previous incident made us realize we needed different expertise',
      'Research into similar situations revealed gaps in our approach',
      'Other'
    ],
  },
  {
    question: 'What\'s driving the timing on this?',
    type: 'select',
    name: 'timingDrivers',
    required: true,
    options: [
      'Immediate situation requiring urgent attention',
      'Strategic priority we want to address soon',
      'Important but not time-sensitive',
      'Just beginning to explore options'
    ],
  },
  {
    question: 'What\'s been your experience with traditional solutions on this type of issue?',
    type: 'multiselect',
    name: 'traditionalSolutionsExperience',
    required: true,
    options: [
      'They can\'t identify the sophisticated patterns we\'re seeing',
      'Multiple providers giving conflicting analysis',
      'They treat symptoms but miss the underlying system',
      'We haven\'t tried traditional approaches for this issue yet'
    ],
  },
];

interface GZSIntakeFormProps {
  onComplete?: () => void;
  isModal?: boolean;
}

const GZSIntakeForm: React.FC<GZSIntakeFormProps> = ({ onComplete, isModal = false }) => {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
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

  const handleChange = (name: string, value: any) => {
    setAnswers({ ...answers, [name]: value });
  };

  const handleMultiSelectChange = (name: string, option: string, checked: boolean) => {
    const currentValues = answers[name] || [];
    if (checked) {
      if (!currentValues.includes(option)) {
        handleChange(name, [...currentValues, option]);
      }
    } else {
      handleChange(name, currentValues.filter((item: string) => item !== option));
    }
  };

  const isCurrentQuestionAnswered = () => {
    if (currentQuestion === -1) return true;
    const currentQ = questions[currentQuestion];
    const answer = answers[currentQ.name];
    
    if (!currentQ.required) return true;
    
    if (currentQ.type === 'multiselect') {
      return answer && Array.isArray(answer) && answer.length > 0;
    }
    
    return answer && answer.trim() !== '' && answer.length > 0;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('GZS Intake Form Answers:', answers);
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Modal will only close when user clicks X - no auto-close
  };

  const progress = currentQuestion > -1 ? ((currentQuestion + 1) / (questions.length + 1)) * 100 : 0;

  if (submitted) {
    return (
      <div className={isModal ? "w-full flex items-center justify-center py-12" : "min-h-screen w-full flex items-center justify-center px-6 py-12"}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-12 max-w-4xl mx-auto"
        >
          <div className="space-y-8">
            <div className="w-16 h-px bg-foreground/20 mx-auto"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-[0.9] text-foreground">
              Application Submitted
            </h1>
            <p className="text-base sm:text-lg font-light leading-relaxed text-foreground/80 max-w-xl mx-auto">
              Your application is being reviewed. Our evaluation process ensures optimal engagement alignment. You will be contacted within 48-72 hours regarding your qualification status.
            </p>
          </div>
          <div className="pt-8">
            <div className="inline-flex items-center space-x-3 text-sm font-light tracking-widest uppercase text-foreground/60">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span>Application Under Review</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={isModal ? "w-full flex flex-col" : "min-h-screen w-full flex flex-col"}>
      <div className={isModal ? "flex flex-col" : "flex-1 flex flex-col"}>
        {/* Fixed Progress Bar at Top */}
        <div className="w-full bg-background/95 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto">
            <Progress value={progress} className="mb-2" />
            <div className="flex justify-between items-center text-xs font-light tracking-widest uppercase text-foreground/60">
              <span>Legacy Ecosystem Analysis Application</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={isModal ? "flex flex-col justify-start px-4 sm:px-6 pt-4" : "flex-1 flex flex-col justify-start px-4 sm:px-6 pt-8"}>
          <div className="w-full max-w-3xl mx-auto my-10">
            <AnimatePresence mode="wait">
              {currentQuestion === -1 && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-center space-y-12"
                >
                  <div className="space-y-8">
                    <div className="w-16 h-px bg-foreground/20 mx-auto"></div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-light leading-tight text-foreground">
                      Legacy Ecosystem 
                      <span className="block">Analysis Application</span>
                    </h1>
                  </div>
                  <p className="text-base sm:text-lg font-light leading-relaxed text-foreground/80 max-w-xl mx-auto">
                    This confidential analysis reveals exactly how relationships and systems affect your legacy - and how to optimize authentic control.
                  </p>
                  <Button 
                    onClick={() => setCurrentQuestion(0)}
                    variant="outline"
                    size="lg"
                    className="font-light text-base px-12 py-3 h-auto border-2 border-foreground/20 bg-transparent text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:neumorphic-hover-light hover:dark:neumorphic-hover-dark transition-[border-color,background-color,color,transform,box-shadow] duration-300 ease-in-out rounded-full"
                  >
                    Begin Application
                  </Button>
                </motion.div>
              )}
              {currentQuestion > -1 && currentQuestion < questions.length && (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-4 py-12"
                >
                  <div className="text-center space-y-6">
                    <div className="space-y-3">
                      <div className="text-sm font-light tracking-widest uppercase text-foreground/60">
                        Question {currentQuestion + 1} of {questions.length}
                      </div>
                    </div>
                    <label htmlFor={questions[currentQuestion].name} className="text-xl sm:text-2xl md:text-3xl font-light leading-tight text-foreground block">
                      {questions[currentQuestion].question}
                    </label>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-full max-w-2xl">
                      {questions[currentQuestion].type === 'text' && (
                        <Input
                          id={questions[currentQuestion].name}
                          type="text"
                          className="w-full p-3 sm:p-4 text-base sm:text-lg font-light text-left bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:ring-0 transition-all duration-300"
                          onChange={(e) => handleChange(questions[currentQuestion].name, e.target.value)}
                          value={answers[questions[currentQuestion].name] || ''}
                          autoFocus
                        />
                      )}
                      {questions[currentQuestion].type === 'email' && (
                        <Input
                          id={questions[currentQuestion].name}
                          type="email"
                          className="w-full p-3 sm:p-4 text-base sm:text-lg font-light text-left bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:ring-0 transition-all duration-300"
                          onChange={(e) => handleChange(questions[currentQuestion].name, e.target.value)}
                          value={answers[questions[currentQuestion].name] || ''}
                          autoFocus
                        />
                      )}
                      {questions[currentQuestion].type === 'select' && (
                        <Select onValueChange={(value) => handleChange(questions[currentQuestion].name, value)} value={answers[questions[currentQuestion].name] || ''}>
                          <SelectTrigger className="w-full p-3 sm:p-4 text-base sm:text-lg font-light bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:ring-0 transition-all duration-300">
                            <SelectValue placeholder="Select an option" className="font-light" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border border-foreground/20">
                            {questions[currentQuestion].options?.map((option) => (
                              <SelectItem key={option} value={option} className="text-base sm:text-lg font-light hover:bg-secondary/30 p-3">
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {questions[currentQuestion].type === 'multiselect' && (
                        <div className="space-y-4">
                          {questions[currentQuestion].options?.map((option) => (
                            <div key={option} className="flex items-center space-x-3 p-3 sm:p-4 bg-secondary/10 hover:bg-secondary/20 border border-foreground/10 rounded-lg transition-all duration-300">
                              <Checkbox
                                id={`${questions[currentQuestion].name}-${option}`}
                                checked={(answers[questions[currentQuestion].name] || []).includes(option)}
                                onCheckedChange={(checked) => 
                                  handleMultiSelectChange(questions[currentQuestion].name, option, checked as boolean)
                                }
                                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                              <label 
                                htmlFor={`${questions[currentQuestion].name}-${option}`}
                                className="text-base font-light text-foreground cursor-pointer flex-1"
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
              {currentQuestion === questions.length && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-12"
                >
                  <div className="text-center space-y-8">
                    <div className="space-y-4">
                      <div className="w-16 h-px bg-foreground/20 mx-auto"></div>
                      <div className="text-sm font-light tracking-widest uppercase text-foreground/60">
                        Final Review
                      </div>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-light leading-tight text-foreground">
                      Review Your Application
                    </h2>
                  </div>
                  <div className="space-y-6 max-w-4xl mx-auto">
                    {questions.map((q, i) => (
                      <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 bg-secondary/20 border border-foreground/10 rounded-lg hover:bg-secondary/30 hover:neumorphic-hover-card hover:dark:neumorphic-hover-card-dark transition-all duration-300">
                        <p className="font-light text-foreground/80 text-base">{q.question}</p>
                        <div className="text-foreground font-light text-base lg:text-right">
                          {q.type === 'multiselect' ? (
                            <div className="space-y-1">
                              {(answers[q.name] || []).length > 0 ? (
                                (answers[q.name] || []).map((item: string, idx: number) => (
                                  <div key={idx}>• {item}</div>
                                ))
                              ) : (
                                'Not answered'
                              )}
                            </div>
                          ) : (
                            answers[q.name] || 'Not answered'
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Navigation - Now inside content area */}
            <div className="w-full max-w-2xl mx-auto flex justify-between items-center mt-8 sm:mt-12">
              {currentQuestion > -1 ? (
                <Button 
                  variant="outline" 
                  onClick={handlePrev}
                  size="lg"
                  className="font-light text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 border-2 border-foreground/30 rounded-full min-h-[44px] min-w-[44px] hover:neumorphic-hover-light hover:dark:neumorphic-hover-dark transition-all duration-300"
                >
                  Previous
                </Button>
              ) : <div />}
              {currentQuestion < questions.length -1 ? (
                <Button 
                  onClick={handleNext}
                  variant="outline"
                  size="lg"
                  disabled={!isCurrentQuestionAnswered()}
                  className="font-light text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 border-2 border-foreground/30 rounded-full min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed hover:neumorphic-hover-light hover:dark:neumorphic-hover-dark transition-all duration-300"
                >
                  Next
                </Button>
              ) : currentQuestion === questions.length -1 ? (
                  <Button 
                    onClick={handleNext}
                    variant="outline"
                    size="lg"
                    disabled={!isCurrentQuestionAnswered()}
                    className="font-light text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 border-2 border-foreground/30 rounded-full min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed hover:neumorphic-hover-light hover:dark:neumorphic-hover-dark transition-all duration-300"
                  >
                    Review
                  </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  variant="outline"
                  size="lg"
                  disabled={isSubmitting}
                  className="font-light text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 border-2 border-foreground/30 rounded-full min-h-[44px] disabled:opacity-70 disabled:cursor-not-allowed hover:neumorphic-hover-light hover:dark:neumorphic-hover-dark transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GZSIntakeForm;