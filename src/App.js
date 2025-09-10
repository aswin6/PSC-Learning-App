import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { Clock, BookOpen, Award, BarChart, Search, Bookmark, Home, User, Menu, X, CheckCircle, XCircle } from 'lucide-react';
import questionBank from './questionBank';

// Get all questions from question bank
const getAllQuestions = () => {
  const allQuestions = [];
  Object.values(questionBank).forEach(section => {
    section.topics.forEach(topic => {
      topic.questions.forEach(question => {
        allQuestions.push({
          ...question,
          section: section.title,
          topic: topic.topic
        });
      });
    });
  });
  return allQuestions;
};

// App component with routing
const App = () => {
  const [userProgress, setUserProgress] = useState({
    testsCompleted: 12,
    studyStreak: 7,
    totalQuestionsSolved: 450,
    accuracy: 78,
    bookmarks: []
  });

  const updateProgress = (newData) => {
    setUserProgress(prev => ({ ...prev, ...newData }));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pb-16">
          <Routes>
            <Route path="/" element={<Dashboard userProgress={userProgress} />} />
            <Route path="/study" element={<StudyPage />} />
            <Route path="/study/:section" element={<SectionQuestions />} />
            <Route path="/question-bank" element={<QuestionBankPage userProgress={userProgress} updateProgress={updateProgress} />} />
            <Route path="/mock-test" element={<MockTestPage />} />
            <Route path="/mock-test/:type" element={<TestPage updateProgress={updateProgress} />} />
            <Route path="/results/:testId" element={<ResultsPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/practice/:section" element={<PracticeQuestions />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
};

// Header component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8" />
            <span className="text-xl font-bold">Kerala PSC</span>
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-200">Dashboard</Link>
            <Link to="/study" className="hover:text-blue-200">Study</Link>
            <Link to="/question-bank" className="hover:text-blue-200">Questions</Link>
            <Link to="/mock-test" className="hover:text-blue-200">Mock Test</Link>
            <Link to="/practice" className="hover:text-blue-200">Practice</Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" className="block py-2 hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            <Link to="/study" className="block py-2 hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>Study</Link>
            <Link to="/question-bank" className="block py-2 hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>Questions</Link>
            <Link to="/mock-test" className="block py-2 hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>Mock Test</Link>
            <Link to="/practice" className="block py-2 hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>Practice</Link>
          </div>
        )}
      </div>
    </header>
  );
};

// Bottom Navigation
const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        <Link to="/" className="flex flex-col items-center py-2 text-blue-600">
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/study" className="flex flex-col items-center py-2 text-gray-600 hover:text-blue-600">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs mt-1">Study</span>
        </Link>
        <Link to="/mock-test" className="flex flex-col items-center py-2 text-gray-600 hover:text-blue-600">
          <Clock className="w-5 h-5" />
          <span className="text-xs mt-1">Tests</span>
        </Link>
        <Link to="/practice" className="flex flex-col items-center py-2 text-gray-600 hover:text-blue-600">
          <Award className="w-5 h-5" />
          <span className="text-xs mt-1">Practice</span>
        </Link>
      </div>
    </nav>
  );
};

// Dashboard Page
const Dashboard = ({ userProgress }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Tests Completed</p>
              <p className="text-2xl font-bold text-gray-900">{userProgress.testsCompleted}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Award className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Study Streak</p>
              <p className="text-2xl font-bold text-gray-900">{userProgress.studyStreak} days</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Questions Solved</p>
              <p className="text-2xl font-bold text-gray-900">{userProgress.totalQuestionsSolved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <BarChart className="w-8 h-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">{userProgress.accuracy}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/mock-test" className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow transition-colors">
          <Clock className="w-8 h-8 mb-4" />
          <h3 className="text-xl font-bold mb-2">Mock Tests</h3>
          <p className="text-blue-100">Take full-length practice tests</p>
        </Link>

        <Link to="/practice" className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg shadow transition-colors">
          <Award className="w-8 h-8 mb-4" />
          <h3 className="text-xl font-bold mb-2">Practice Mode</h3>
          <p className="text-green-100">Unlimited practice without timer</p>
        </Link>

        <Link to="/study" className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg shadow transition-colors">
          <BookOpen className="w-8 h-8 mb-4" />
          <h3 className="text-xl font-bold mb-2">Study Material</h3>
          <p className="text-purple-100">Access organized study content</p>
        </Link>
      </div>
    </div>
  );
};

// Study Page
const StudyPage = () => {
  const sections = Object.keys(questionBank);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Study Material</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map(section => (
          <Link
            key={section}
            to={`/study/${section}`}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {questionBank[section].title}
                </h3>
                <p className="text-gray-600">
                  {questionBank[section].topics.length} topics available
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Section Questions Page
const SectionQuestions = () => {
  const { section } = useParams();
  const sectionData = questionBank[section];

  if (!sectionData) {
    return <div className="text-center py-8">Section not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{sectionData.title}</h1>

      <div className="space-y-6">
        {sectionData.topics.map(topic => (
          <div key={topic.id} className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{topic.topic}</h3>
              <div className="space-y-6">
                {topic.questions.map(question => (
                  <QuestionCard key={question.id} question={question} showAnswer={true} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Question Bank Page
const QuestionBankPage = ({ userProgress, updateProgress }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  const allQuestions = getAllQuestions();

  const filteredQuestions = allQuestions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = selectedSection === 'all' || question.section.toLowerCase().includes(selectedSection);
    return matchesSearch && matchesSection;
  });

  const toggleBookmark = (questionId) => {
    const bookmarks = userProgress.bookmarks || [];
    const isBookmarked = bookmarks.includes(questionId);

    const newBookmarks = isBookmarked
      ? bookmarks.filter(id => id !== questionId)
      : [...bookmarks, questionId];

    updateProgress({ bookmarks: newBookmarks });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Question Bank</h1>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Sections</option>
            <option value="general">General Knowledge</option>
            <option value="current">Current Affairs</option>
            <option value="english">English</option>
            <option value="arithmetic">Arithmetic</option>
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map(question => (
          <div key={question.id} className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {question.section}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      {question.topic}
                    </span>
                  </div>
                  <QuestionCard
                    question={question}
                    showAnswer={true}
                  />
                </div>
                <button
                  onClick={() => toggleBookmark(question.id)}
                  className={`p-2 rounded-lg ${userProgress.bookmarks?.includes(question.id)
                    ? 'text-yellow-500 bg-yellow-50'
                    : 'text-gray-400 bg-gray-50'
                    }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No questions found matching your search.</p>
        </div>
      )}
    </div>
  );
};

// Mock Test Page
const MockTestPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mock Tests</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/mock-test/full" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <Clock className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Full-Length Test</h3>
          <p className="text-gray-600 mb-4">100 Questions • 75 Minutes</p>
          <p className="text-sm text-gray-500">Complete exam simulation with all sections</p>
        </Link>

        <Link to="/mock-test/sectional" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <BookOpen className="w-12 h-12 text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Sectional Test</h3>
          <p className="text-gray-600 mb-4">25 Questions • 20 Minutes</p>
          <p className="text-sm text-gray-500">Focus on specific subject areas</p>
        </Link>

        <Link to="/mock-test/custom" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <Award className="w-12 h-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Test</h3>
          <p className="text-gray-600 mb-4">Flexible • Custom Time</p>
          <p className="text-sm text-gray-500">Create your own test parameters</p>
        </Link>
      </div>
    </div>
  );
};

// Test Page Component
const TestPage = ({ updateProgress }) => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const allQuestions = getAllQuestions();
  const [testQuestions, setTestQuestions] = useState([]);

  useEffect(() => {
    let questions = [];
    let duration = 0;

    switch (type) {
      case 'full':
        questions = allQuestions.slice(0, Math.min(6, allQuestions.length)); // Using available questions
        duration = 75 * 60; // 75 minutes
        break;
      case 'sectional':
        questions = allQuestions.slice(0, Math.min(3, allQuestions.length)); // Using available questions
        duration = 20 * 60; // 20 minutes
        break;
      case 'custom':
        questions = allQuestions.slice(0, Math.min(4, allQuestions.length)); // Using available questions
        duration = 30 * 60; // 30 minutes
        break;
      default:
        questions = allQuestions.slice(0, 3);
        duration = 15 * 60;
    }

    setTestQuestions(questions);
    setTimeLeft(duration);
  }, [type]);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmitTest();
    }
  }, [timeLeft, isSubmitted]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: answerIndex
    });
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);

    // Calculate score
    let correctAnswers = 0;
    testQuestions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / testQuestions.length) * 100);

    // Update user progress
    updateProgress({
      testsCompleted: (updateProgress.testsCompleted || 0) + 1,
      totalQuestionsSolved: (updateProgress.totalQuestionsSolved || 0) + testQuestions.length
    });

    // Navigate to results
    const testId = Date.now();
    navigate(`/results/${testId}`, {
      state: {
        score,
        correctAnswers,
        totalQuestions: testQuestions.length,
        answers,
        questions: testQuestions,
        testType: type
      }
    });
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (testQuestions.length === 0) {
    return <div className="text-center py-8">Loading test...</div>;
  }

  if (showReview) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Review Answers</h1>

        <div className="space-y-6">
          {testQuestions.map((question, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="mb-4">
                <span className="text-sm text-gray-500">Question {index + 1}</span>
                <h3 className="text-lg font-medium text-gray-900">{question.question}</h3>
              </div>

              <div className="space-y-2 mb-4">
                {question.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={`p-3 rounded-lg border ${optIndex === question.correct
                      ? 'bg-green-50 border-green-200'
                      : answers[index] === optIndex && optIndex !== question.correct
                        ? 'bg-red-50 border-red-200'
                        : 'bg-gray-50 border-gray-200'
                      }`}
                  >
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700">
                        {String.fromCharCode(65 + optIndex)}. {option}
                      </span>
                      {optIndex === question.correct && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                      )}
                      {answers[index] === optIndex && optIndex !== question.correct && (
                        <XCircle className="w-5 h-5 text-red-500 ml-2" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {answers[index] !== undefined && (
                <div className="text-sm">
                  <p className="font-medium text-gray-700">Your answer: {String.fromCharCode(65 + answers[index])}</p>
                  <p className="font-medium text-gray-700">Correct answer: {String.fromCharCode(65 + question.correct)}</p>
                  {question.explanation && (
                    <p className="text-gray-600 mt-2"><strong>Explanation:</strong> {question.explanation}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmitTest}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Test Header */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {type === 'full' ? 'Full-Length Test' :
              type === 'sectional' ? 'Sectional Test' : 'Custom Test'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-orange-500 mr-2" />
              <span className={`font-bold ${timeLeft < 300 ? 'text-red-500' : 'text-gray-900'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {testQuestions.length}</span>
            <span>{Object.keys(answers).length} answered</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / testQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Question {currentQuestion + 1}</span>
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                {testQuestions[currentQuestion].section}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                {testQuestions[currentQuestion].topic}
              </span>
            </div>
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-6">
            {testQuestions[currentQuestion].question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {testQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQuestion, index)}
              className={`w-full p-4 text-left rounded-lg border transition-colors ${answers[currentQuestion] === index
                ? 'bg-blue-50 border-blue-300 text-blue-900'
                : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'
                }`}
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            Previous
          </button>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowReview(true)}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Review Answers
            </button>

            {currentQuestion === testQuestions.length - 1 ? (
              <button
                onClick={handleSubmitTest}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(testQuestions.length - 1, currentQuestion + 1))}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Question Numbers */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-3">Question Navigation:</p>
          <div className="grid grid-cols-10 gap-2">
            {testQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 text-xs font-medium rounded ${index === currentQuestion
                  ? 'bg-blue-600 text-white'
                  : answers[index] !== undefined
                    ? 'bg-green-200 text-green-800'
                    : 'bg-gray-200 text-gray-700'
                  } hover:opacity-80 transition-opacity`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Results Page
const ResultsPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const location = window.location;

  // In a real app, you'd fetch results by testId
  // For demo, we'll use passed state or mock data
  const testResults =
  // history?.state?.usr || 
  {
    score: 75,
    correctAnswers: 3,
    totalQuestions: 4,
    testType: 'practice',
    answers: {},
    questions: getAllQuestions().slice(0, 4)
  };

  const accuracy = Math.round((testResults.correctAnswers / testResults.totalQuestions) * 100);
  const rank = Math.floor(Math.random() * 1000) + 1; // Mock rank

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Test Results</h1>

      {/* Score Overview */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl font-bold text-white mb-4 ${accuracy >= 80 ? 'bg-green-500' :
            accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
            {accuracy}%
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {accuracy >= 80 ? 'Excellent!' : accuracy >= 60 ? 'Good Job!' : 'Keep Practicing!'}
          </h2>
          <p className="text-gray-600">
            You answered {testResults.correctAnswers} out of {testResults.totalQuestions} questions correctly
          </p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <BarChart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-gray-900">Score</h3>
          <p className="text-2xl font-bold text-blue-600">{accuracy}%</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-gray-900">Rank</h3>
          <p className="text-2xl font-bold text-green-600">#{rank}</p>
          <p className="text-sm text-gray-500">out of 5000</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <CheckCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-gray-900">Accuracy</h3>
          <p className="text-2xl font-bold text-purple-600">{accuracy}%</p>
        </div>
      </div>

      {/* Answer Review */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Answer Review</h3>
        <div className="space-y-6">
          {testResults.questions?.map((question, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Question {index + 1}</span>
                  {testResults.answers[index] === question.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <h4 className="font-medium text-gray-900">{question.question}</h4>
              </div>

              <div className="space-y-2">
                {question.options?.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={`p-3 rounded-lg ${optIndex === question.correct
                      ? 'bg-green-50 border border-green-200'
                      : testResults.answers[index] === optIndex
                        ? 'bg-red-50 border border-red-200'
                        : 'bg-gray-50'
                      }`}
                  >
                    <span className="font-medium">
                      {String.fromCharCode(65 + optIndex)}. {option}
                    </span>
                    {optIndex === question.correct && (
                      <span className="ml-2 text-green-600 text-sm">(Correct)</span>
                    )}
                    {testResults.answers[index] === optIndex && optIndex !== question.correct && (
                      <span className="ml-2 text-red-600 text-sm">(Your answer)</span>
                    )}
                  </div>
                ))}
              </div>

              {question.explanation && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate('/mock-test')}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Take Another Test
        </button>
        <button
          onClick={() => navigate('/practice')}
          className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Practice More
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

// Practice Page
const PracticePage = () => {
  const sections = Object.keys(questionBank);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Practice Mode</h1>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold text-blue-900 mb-2">Unlimited Practice</h2>
        <p className="text-blue-800">
          Practice without time limits. Review explanations immediately and retry questions until you master them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map(section => (
          <Link
            key={section}
            to={`/practice/${section}`}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {questionBank[section].title}
                </h3>
                <p className="text-gray-600 mb-2">
                  {questionBank[section].topics.length} topics available
                </p>
                <p className="text-sm text-green-600 font-medium">
                  ✓ No time limit • Instant feedback
                </p>
              </div>
              <Award className="w-8 h-8 text-green-500" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Practice Questions Component
const PracticeQuestions = () => {
  const { section } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const sectionData = questionBank[section];
  const allQuestions = sectionData?.topics.flatMap(topic => topic.questions) || [];

  if (!sectionData || allQuestions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No questions available for this section.</p>
      </div>
    );
  }

  const currentQ = allQuestions[currentQuestion];

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerIndex);
      setShowExplanation(true);

      const newTotal = score.total + 1;
      const newCorrect = answerIndex === currentQ.correct ? score.correct + 1 : score.correct;
      setScore({ correct: newCorrect, total: newTotal });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleRetryQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{sectionData.title} Practice</h1>
        <div className="text-right">
          <p className="text-sm text-gray-600">Score: {score.correct}/{score.total}</p>
          <p className="text-lg font-bold text-green-600">{accuracy}% Accuracy</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {allQuestions.length}</span>
          <span>Practice Mode - No Time Limit</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / allQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-medium text-gray-900 mb-6">
          {currentQ.question}
        </h2>

        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 text-left rounded-lg border transition-colors ${selectedAnswer === null
                ? 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'
                : index === currentQ.correct
                  ? 'bg-green-50 border-green-300 text-green-900'
                  : selectedAnswer === index
                    ? 'bg-red-50 border-red-300 text-red-900'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
            >
              <div className="flex items-center justify-between">
                <span>
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                </span>
                {showExplanation && index === currentQ.correct && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {showExplanation && selectedAnswer === index && index !== currentQ.correct && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">Explanation:</h4>
            <p className="text-blue-800">{currentQ.explanation}</p>

            <div className="mt-4 flex space-x-3">
              {selectedAnswer !== currentQ.correct && (
                <button
                  onClick={handleRetryQuestion}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Retry Question
                </button>
              )}

              {currentQuestion < allQuestions.length - 1 && (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Next Question
                </button>
              )}

              {currentQuestion === allQuestions.length - 1 && (
                <div className="text-center">
                  <p className="text-green-600 font-bold">Practice Complete!</p>
                  <p className="text-gray-600">Final Score: {score.correct}/{score.total} ({accuracy}%)</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Question Card Component
const QuestionCard = ({ question, showAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(showAnswer || false);

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">{question.question}</h3>

      <div className="space-y-2">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border cursor-pointer transition-colors ${showExplanation && index === question.correct
              ? 'bg-green-50 border-green-200'
              : selectedAnswer === index
                ? 'bg-blue-50 border-blue-200'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            onClick={() => setSelectedAnswer(index)}
          >
            <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
            {showExplanation && index === question.correct && (
              <CheckCircle className="w-4 h-4 text-green-500 inline ml-2" />
            )}
          </div>
        ))}
      </div>

      {showExplanation && question.explanation && (
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Explanation:</strong> {question.explanation}
          </p>
        </div>
      )}

      {!showAnswer && selectedAnswer !== null && !showExplanation && (
        <button
          onClick={() => setShowExplanation(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Show Answer
        </button>
      )}
    </div>
  );
};

export default App;