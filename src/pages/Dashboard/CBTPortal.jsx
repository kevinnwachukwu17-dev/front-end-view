import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { 
  Clock, 
  Award, 
  Target, 
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Flag
} from 'lucide-react';

const CBTPortal = () => {
  const [exams, setExams] = useState([]);
  const [activeExam, setActiveExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    let timer;
    if (examStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            submitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, timeLeft]);

  const fetchExams = async () => {
    try {
      const response = await api.get('/exams');
      setExams(response.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
      toast.error('Failed to load exams');
    } finally {
      setLoading(false);
    }
  };

  const startExam = async (exam) => {
    setActiveExam(exam);
    setTimeLeft(exam.duration * 60);
    setExamStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    
    // Fetch questions
    try {
      const response = await api.get(`/exams/${exam.id}/questions`);
      setActiveExam(prev => ({ ...prev, questions: response.data }));
    } catch (error) {
      toast.error('Failed to load exam questions');
    }
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const submitExam = async () => {
    setExamStarted(false);
    setExamCompleted(true);
    
    try {
      const response = await api.post(`/exams/${activeExam.id}/submit`, {
        answers: answers,
        time_spent: (activeExam.duration * 60) - timeLeft
      });
      setResult(response.data);
      toast.success('Exam submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit exam');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (examStarted && activeExam) {
    const question = activeExam.questions?.[currentQuestion];
    const progress = ((currentQuestion + 1) / activeExam.questions?.length) * 100;

    return (
      <div className="space-y-6">
        {/* Exam Header */}
        <div className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">{activeExam.title}</h2>
              <p className="text-gray-400 text-sm">{activeExam.subject}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-yellow-400">
                <Clock className="w-5 h-5" />
                <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
              </div>
              <p className="text-gray-400 text-xs">Time Remaining</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Progress</span>
              <span>{currentQuestion + 1} of {activeExam.questions?.length}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-primary-500 rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
        >
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Flag className="w-5 h-5 text-primary-500" />
              <span className="text-primary-500">Question {currentQuestion + 1}</span>
            </div>
            <p className="text-white text-lg">{question?.question_text}</p>
          </div>

          <div className="space-y-3">
            {['A', 'B', 'C', 'D'].map(option => (
              <label
                key={option}
                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition ${
                  answers[question?.id] === option
                    ? 'bg-primary-600/20 border border-primary-500'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={answers[question?.id] === option}
                  onChange={() => handleAnswer(question?.id, option)}
                  className="w-4 h-4 text-primary-500"
                />
                <span className="text-white">{option}.</span>
                <span className="text-gray-300">{question?.[`option_${option.toLowerCase()}`]}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-2 bg-white/10 rounded-lg text-white disabled:opacity-50 hover:bg-white/20 transition"
            >
              Previous
            </button>
            {currentQuestion === activeExam.questions?.length - 1 ? (
              <button
                onClick={submitExam}
                className="px-6 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition"
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="px-6 py-2 bg-primary-600 rounded-lg text-white hover:bg-primary-700 transition"
              >
                Next
              </button>
            )}
          </div>
        </motion.div>

        {/* Question Palette */}
        <div className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <h3 className="text-white font-medium mb-3">Question Palette</h3>
          <div className="flex flex-wrap gap-2">
            {activeExam.questions?.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-10 h-10 rounded-lg transition ${
                  idx === currentQuestion
                    ? 'bg-primary-600 text-white'
                    : answers[activeExam.questions[idx]?.id]
                      ? 'bg-green-600/50 text-white'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (examCompleted && result) {
    const percentage = (result.score / result.total) * 100;
    const passed = percentage >= 50;

    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center"
        >
          {passed ? (
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          ) : (
            <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          )}
          <h2 className="text-2xl font-bold text-white mb-2">
            {passed ? 'Congratulations!' : 'Keep Practicing!'}
          </h2>
          <p className="text-gray-400 mb-6">
            You scored {result.score} out of {result.total}
          </p>
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke={passed ? '#22c55e' : '#ef4444'}
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${percentage * 5.53} 553`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{percentage}%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-gray-400 text-sm">Correct Answers</p>
              <p className="text-2xl font-bold text-green-400">{result.correct}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-gray-400 text-sm">Wrong Answers</p>
              <p className="text-2xl font-bold text-red-400">{result.wrong}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setExamCompleted(false);
              setActiveExam(null);
            }}
            className="mt-6 px-6 py-2 bg-primary-600 rounded-lg text-white hover:bg-primary-700 transition"
          >
            Try Another Exam
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
      >
        <h1 className="text-2xl font-bold text-white mb-2">CBT Practice Portal</h1>
        <p className="text-gray-400">Practice with real exam-style questions and track your progress</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((exam) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-primary-500/50 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{exam.title}</h3>
                <p className="text-gray-400 text-sm">{exam.subject}</p>
              </div>
              <Award className="w-8 h-8 text-primary-500" />
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{exam.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Target className="w-4 h-4" />
                <span className="text-sm">{exam.total_questions} questions</span>
              </div>
            </div>
            <button
              onClick={() => startExam(exam)}
              className="w-full py-2 bg-primary-600 rounded-lg text-white hover:bg-primary-700 transition flex items-center justify-center gap-2"
            >
              Start Exam <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CBTPortal;