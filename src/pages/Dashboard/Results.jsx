import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Clock,
  Download,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const Results = () => {
  const [results, setResults] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [subjectPerformance, setSubjectPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('all');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await api.get('/results');
      setResults(response.data.exams);
      setPerformanceData(response.data.performanceTrend);
      setSubjectPerformance(response.data.subjectPerformance);
    } catch (error) {
      console.error('Error fetching results:', error);
      toast.error('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  const calculateAverage = () => {
    if (results.length === 0) return 0;
    const sum = results.reduce((acc, r) => acc + r.percentage, 0);
    return (sum / results.length).toFixed(1);
  };

  const getBestSubject = () => {
    if (subjectPerformance.length === 0) return null;
    return subjectPerformance.reduce((best, current) => 
      current.percentage > best.percentage ? current : best
    );
  };

  const getWeakestSubject = () => {
    if (subjectPerformance.length === 0) return null;
    return subjectPerformance.reduce((weakest, current) => 
      current.percentage < weakest.percentage ? current : weakest
    );
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const bestSubject = getBestSubject();
  const weakestSubject = getWeakestSubject();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Results & Analytics</h1>
        <p className="text-gray-400">Track your academic performance and progress</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Average Score</span>
            <Award className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white">{calculateAverage()}%</p>
          <span className="text-xs text-gray-500">Across all exams</span>
        </div>
        <div className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Exams Taken</span>
            <Target className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">{results.length}</p>
          <span className="text-xs text-gray-500">Total practice tests</span>
        </div>
        <div className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Best Subject</span>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-lg font-bold text-white truncate">{bestSubject?.subject || 'N/A'}</p>
          <span className="text-xs text-green-400">{bestSubject?.percentage}%</span>
        </div>
        <div className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Area for Improvement</span>
            <Clock className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-lg font-bold text-white truncate">{weakestSubject?.subject || 'N/A'}</p>
          <span className="text-xs text-red-400">{weakestSubject?.percentage}%</span>
        </div>
      </div>

      {/* Performance Trend Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Performance Trend</h2>
        {performanceData.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No data available yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="average" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </motion.div>

      {/* Subject Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Subject Performance</h2>
          {subjectPerformance.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Award className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No subject data available</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="subject" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="percentage" fill="#3b82f6">
                  {subjectPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Exam Results History</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No exam history</p>
              </div>
            ) : (
              results.map((result, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{result.exam_title}</span>
                    <span className={`text-sm font-semibold ${
                      result.percentage >= 70 ? 'text-green-400' :
                      result.percentage >= 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {result.percentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{result.subject}</span>
                    <span className="text-gray-500">{new Date(result.date).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2 w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        result.percentage >= 70 ? 'bg-green-500' :
                        result.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${result.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Download Report Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-end"
      >
        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-primary-600 rounded-lg text-white hover:bg-primary-700 transition flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Performance Report
        </button>
      </motion.div>
    </div>
  );
};

export default Results;