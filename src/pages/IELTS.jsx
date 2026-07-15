
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';


const IELTS = () => {
    
  useEffect(() => {
    // Hide navbar
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    
    if (navbar) {
      navbar.style.display = 'none';
    }
    if (footer) {
      footer.style.display = 'none';
    }
    
    document.body.style.paddingTop = '0';
    
    return () => {
      if (navbar) {
        navbar.style.display = '';
      }
      if (footer) {
        footer.style.display = '';
      }
      document.body.style.paddingTop = '';
    };
  }, []);

  const [activeTab, setActiveTab] = useState('listening');
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [audioStates, setAudioStates] = useState({});
  const audioRefs = useRef({});

  // Comment state for each category
  const [comments, setComments] = useState({});
  const [commentFormData, setCommentFormData] = useState({
    name: '',
    email: '',
    website: '',
    comment: '',
    notifyFollowup: false,
    notifyPosts: false
  });
  const [submitting, setSubmitting] = useState(false);

  const openModal = (lessonData) => {
    setModalData(lessonData);
    setIsModalOpen(true);
    setExpandedSections({});
    setAudioStates({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
    setExpandedSections({});
    Object.keys(audioRefs.current).forEach(key => {
      if (audioRefs.current[key]) {
        audioRefs.current[key].pause();
        audioRefs.current[key].currentTime = 0;
      }
    });
  };

  const toggleSection = (practiceId, section) => {
    const key = `${practiceId}-${section}`;
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleAudio = (practiceId) => {
    const audio = audioRefs.current[practiceId];
    if (audio) {
      if (audio.paused) {
        Object.keys(audioRefs.current).forEach(key => {
          if (key !== practiceId && audioRefs.current[key]) {
            audioRefs.current[key].pause();
            audioRefs.current[key].currentTime = 0;
            setAudioStates(prev => ({ ...prev, [key]: false }));
          }
        });
        audio.play();
        setAudioStates(prev => ({ ...prev, [practiceId]: true }));
      } else {
        audio.pause();
        setAudioStates(prev => ({ ...prev, [practiceId]: false }));
      }
    }
  };

  const handleAudioEnded = (practiceId) => {
    setAudioStates(prev => ({ ...prev, [practiceId]: false }));
  };

  const handleCommentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCommentFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentFormData.name || !commentFormData.email || !commentFormData.comment) {
      alert('Please fill in all required fields');
      return;
    }
    
    setSubmitting(true);
    
    const newComment = {
      id: Date.now(),
      name: commentFormData.name,
      email: commentFormData.email,
      website: commentFormData.website,
      comment: commentFormData.comment,
      date: new Date().toLocaleString(),
      notifyFollowup: commentFormData.notifyFollowup,
      notifyPosts: commentFormData.notifyPosts
    };
    
    // Simulate API call
    setTimeout(() => {
      setComments(prev => ({
        ...prev,
        [activeTab]: [...(prev[activeTab] || []), newComment]
      }));
      
      // Reset form
      setCommentFormData({
        name: '',
        email: '',
        website: '',
        comment: '',
        notifyFollowup: false,
        notifyPosts: false
      });
      
      setSubmitting(false);
      alert('Comment posted successfully!');
    }, 500);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const categories = [
    { id: 'listening', title: 'Listening', icon: '🎧', color: 'from-blue-500 to-blue-600' },
    { id: 'reading', title: 'Reading', icon: '📖', color: 'from-green-500 to-green-600' },
    { id: 'writing', title: 'Writing', icon: '✍️', color: 'from-purple-500 to-purple-600' },
    { id: 'speaking', title: 'Speaking', icon: '🎙️', color: 'from-orange-500 to-orange-600' },
    { id: 'vocabulary', title: 'Vocabulary', icon: '📚', color: 'from-pink-500 to-pink-600' },
    { id: 'topics', title: 'Topics', icon: '📋', color: 'from-indigo-500 to-indigo-600' },
    { id: 'ontheday', title: 'On The Day Tips', icon: '📅', color: 'from-rose-500 to-rose-600' },
    { id: 'topresults', title: 'Top Results', icon: '🏆', color: 'from-yellow-500 to-yellow-600' },
    { id: 'advanced', title: 'Advanced IELTS', icon: '⭐', color: 'from-red-500 to-red-600' }
  ];

  // ========== LISTENING CONTENT ==========
  const multipleChoiceContent = {
    title: 'IELTS Listening Multiple Choice Practice & Essential Tips',
    description: 'This lesson focuses on IELTS listening multiple choice questions and offers tips, practice and useful vocabulary to help you achieve your best.',
    tips: [
      'check for a title', 'find keywords in the question', 'paraphrase the keywords',
      'Read through the answer options', 'highlight similar options', 'note the differences',
      'All answer options will probably be mentioned in the recording – but only one will be the right answer.',
      'The questions come in order but the answer options will not come in order',
      'Don\'t think that the first answer you hear is the correct one – keep listening.',
      'You must develop speed reading skills to be able to read all answers and spot keywords'
    ],
    questionTypes: [
      { name: 'Answering a Question Three Options', description: 'Choose the correct answer to a question from three options' },
      { name: 'Finish the sentence', description: 'Complete a sentence by selecting the correct ending' },
      { name: 'Long List', description: 'Select multiple answers from a longer list of options' },
      { name: 'Picture Selection', description: 'Choose the correct picture based on the description' }
    ],
    practices: [
      {
        id: 1,
        title: 'Practice 1: Long List Selection',
        topic: 'Health Care Conference',
        question: 'Questions 1-3: Who will be lecturing at the conference today? Choose three options from the following list (A-G)',
        audioUrl: '/audio/health-care-conference.mp3',
        imageUrl: null,
        options: [
          'A = Dr Christopher Lord',
          'B = Dr David Bishop',
          'C = Dr George Ripley',
          'D = Dr William Benson',
          'E = Dr Roger Dean',
          'F = Dr Daisy Mandalay',
          'G = Dr Ralph Morris'
        ],
        transcript: `Today's topic under discussion is the health care system both past and present. We have a number of guests for today's lectures, videos and debates, one of them the notable Dr David Bishop.

The morning will be kicked off by Dr Roger Dean who will be presenting his speech summarising the major changes and challenges of the health care system from the year 2000 to around 2012. Following him, will be Dr William Benson who will oversee the debate on today's problems for hospitals. After lunch, Dr Daisy Mandalay will be showing a revealing video relating to the current trends in health problems faced by today's society. Dr Christopher Lord will then address everyone on the problems faced by family doctors and the vital role they play in the health care system. Last, but not least, Dr David Bishop, as I mentioned earlier, will take the floor to tell you about his current research. Dr Ralph Morris will be responsible for collecting your feedback on the various parts of the conference at the end of the day. That will conclude our seminars for the day. Tomorrow's conference details will be put up on the notice board later this afternoon but you will be all please to know that Dr George Ripley has agreed to lecture you all.`,
        answers: 'E, A, B (any order). Dr Roger Dean (E), Dr Christopher Lord (A), Dr David Bishop (B)',
        answerExplanation: 'The answer is not C (Dr George Ripley) because he is talking tomorrow not today. The answer is not D (Dr William Benson) because he is running a debate. The answer is not F (Dr Daisy Mandalay) because she is showing a video not talking. The answer is not G (Dr Ralph Morris) because he is collecting feedback and not speaking.'
      },
      {
        id: 2,
        title: 'Practice 2: Picture Selection',
        topic: 'Mammoths',
        question: 'Which type of mammoth is this lecture going to focus on? Choose the correct letter A-C',
        audioUrl: '/audio/mammoths.mp3',
        imageUrl: '/images/mammoth-types.png',
        transcript: `There is evidence of much change and development in the mammoth. We can see the Ambelodon 20 million years ago, the Stegodon 12 million years ago and finally the Stegotetrabelodon which existed somewhere between 7.5 to 4.5 million years ago. There seem to have been a number of changes in the physiology of the mammoth, the most prominent were in the height, the size of the ears and the shape of the head and tusks. Today, I'm going to be focusing, on the one most of us associate with the 'so-called' classic shape and size of a mammoth and which is most known for its huge curving tusks and colossal size.`,
        answer: 'B - The one with huge curving tusks and colossal size',
        vocabulary: 'mammoth = prehistoric animal now extinct similar in shape to an elephant, physiology = make-up / structure, prominent = major / outstanding, huge / colossal = enormous / extremely large'
      },
      {
        id: 3,
        title: 'Practice 3: Common IELTS MC Questions',
        topic: 'Dashford Study Center',
        audioUrl: '/audio/dashford-study-center.mp3',
        imageUrl: null,
        questions: [
          '1. Membership at the study center is 20 pounds: A. for everyone. B. for everyone except the elderly and students. C. for everyone each year.',
          '2. Members are able to take out: A. an unlimited amount of books. B. a maximum of 3 books. C. 3 books for 3 days.',
          '3. Booking is unnecessary for: A. the yoga, dance and gentle exercise classes. B. general fitness classes. C. the walking class.',
          '4. Arts and crafts classes are taught by: A. volunteers. B. teachers. C. teachers and volunteers.'
        ],
        transcript: `The study center in Dashford was opened to give free educational and recreational services to the community of Dashford. Membership is free for over 65's as well as for students, as long as they have a student ID. For everyone else it is an annual membership of 20 pounds.

Members are able to enjoy full access to our extensive library. The library comprises of a comprehensive collection of classic literature, resource books, children's books, history books and popular literature. As members, you are able to borrow up to 3 books at a time for up to 4 days.

Our recreational services extend for both members and non-members. We offer social and leisure activities for all age groups. Our yoga, dance and gentle exercise classes are extremely popular and booking ahead is required to ensure your place on one of these courses. However, our walking group, who meet once a week, offer unlimited places but you do have to have a good level of general fitness. We also have IT classes at beginner, intermediate and advanced levels. But for those of you who are more creative, there are arts and crafts classes which are run by a qualified teacher with volunteer support. Before checking everything why don't you take a look around and see what you might be interested in.`,
        answers: [
          '1. B - Membership is free for over 65\'s and students. For everyone else it is an annual membership of 20 pounds.',
          '2. B - Members are able to borrow up to 3 books at a time.',
          '3. C - The walking group offers unlimited places = no need to book.',
          '4. B - Arts and crafts classes are run by a qualified teacher.'
        ]
      }
    ]
  };

  // Diagram Questions Content
  const diagramQuestionsContent = {
    title: 'IELTS Listening Map & Diagram Techniques & Practice',
    description: 'Maps and diagrams frequently appear in the IELTS listening test. They can appear in any section, although it is more common to find them in Section 2. Below you will find useful tips and techniques to tackle map and diagram completion questions in IELTS listening with practice lessons to hone your skills.',
    
    tips: [
      'Maps can appear in any part of the listening test, although they appear more often in section 2.',
      'Maps are visual so there is a lot to look at in a short amount of time before the recording begins.',
      'First notice the title which tells you what the map is showing.',
      'Notice the number of buildings, facilities or rooms and their names and location.',
      'Maps will nearly always have rooms and buildings labelled to help you.',
      'Learn location language: beyond, next to, after that, further in, to the side, to the left, to the right, to the east, opposite, at the end of the road, by the gate etc.',
      'Check the location of the questions. The questions will come in order in the recording.',
      'Locate north. This is often helpful if it is given on the map.',
      'See if there are any arrows or if the map shows a logical path that the speaker might take.',
      'Always note how many words you need for the answers.',
      'As you move from question to question, follow the order of information in the recording.',
      'Most map recordings are similar to a guided tour which follows a logical order.',
      'Don\'t be distracted by extra information. Focus on listening for those answers.'
    ],
    
    locationLanguage: [
      'beyond', 'next to', 'after that', 'further in', 'to the side',
      'to the left', 'to the right', 'to the east', 'to the west', 'to the south', 'to the north',
      'opposite', 'at the end of the road', 'by the gate', 'directly in front of',
      'on the left hand side', 'straight ahead', 'past the', 'walking through',
      'to the left of this', 'to the right you can find'
    ],
    
    practices: [
      {
        id: 4,
        title: 'Map Practice 1: The Taj Mahal',
        topic: 'Historical Monument Tour',
        description: 'This exercise covers questions 1 – 7. There are two types of questions: sentence completion and map completion.',
        audioUrl: '/audio/taj-mahal.mp3',
        imageUrl: '/images/taj-mahal-map.png',
        questions: [
          'Questions 1-2: Complete the sentences below using no more than one word and/or a number.',
          '1. The Taj Mahal was completed in _________.',
          '2. Around _________ labourers were used in its creation.',
          'Questions 3-7: Label the map below using no more than two words and/or a number.',
          '3. Forecourt',
          '4. Great Gate',
          '5. Pond / Marble Pond',
          '6. Mausoleum',
          '7. Guesthouse / Guest House'
        ],
        transcript: `Welcome to the Taj Mahal. This is one of the most famous monuments to love in the world. It was built between 1631 and 1653 in the city of Agra by the Mughal Emperor Shah as a mausoleum for his wife. The construction involved some 20,000 workers and incorporated materials from China, Tibet, Sri Lanka and Arabia.

We are here at the Outer Gate and directly in front of us is the forecourt. On the left hand side of the forecourt, you will see some subsidiary tombs and opposite that are the tomb attendants' quarters. If you go straight ahead, you will come to the Great Gate and beyond that is the formal gardens. The gardens are divided into 4 sections by paths which represent the 4 rivers of paradise. Midway, where the paths intersect, is a marble pond, in which the mausoleum is beautifully reflected. Walking through the gardens, past the pond, you will come to the mausoleum itself which has a marble dome, 35m high. Each side of the building has archways which are framed by carefully chosen verses from the Qur'an in beautifully stylised calligraphy. To the left of this, is the mosque and to the right you can find a guesthouse. Now I'll give you some time to wander round and see this marvel for yourself.`,
        answers: [
          '1. 1653',
          '2. 20,000',
          '3. forecourt',
          '4. Great Gate',
          '5. marble pond',
          '6. mausoleum',
          '7. guesthouse'
        ],
        answerExplanation: 'The answers must be spelled correctly. "forecourt" (one word), "Great Gate" (capital letters not important), "marble pond" (two words), "mausoleum" (one word), "guesthouse" (one word or "guest house" two words).'
      },
      {
        id: 5,
        title: 'Map Practice 2: The Farm',
        topic: 'Organic Farm Tour',
        description: 'This lesson requires you to label places on the map. Always review locations and predict language before you start listening.',
        audioUrl: '/audio/farm-map.mp3',
        imageUrl: '/images/farm-map.png',
        questions: [
          'Questions 1 – 4: Complete the diagram using no more than two words.',
          '1. Northwest corner: _________ area',
          '2. East of parking area: _________ house',
          '3. North of barn: _________ pens',
          '4. South of barn: _________ storage'
        ],
        transcript: `As you drive up the driveway you will immediately arrive in the parking area. You will see to your left the farmhouse where the farmer lives as you drive up and directly to the left of the parking area is the main shed. There are a number of smaller sheds located around the main shed which are not currently labelled on the map. In the northwest corner of the farm is a pasture area which is a wide grassy expanse. It provides rich organic grass for our cows and, along with other types of feed, gives us our organic status and key selling point. From the parking area, you go east through the milk house, which is used daily, and then into the barn. This is where the cows are often sheltered. On the other side of the barn is the manure storage. To the north you will find the calf hutches which are located just beyond the maternity pens. Only 30% of our cows are used for breeding. In the bottom left corner of the barn is the loading chute. To the south are two circular areas, one of which is the feed storage and the other the deadstock area. We hope you will enjoy looking around our farm and learning about how we manage our cows.`,
        answers: [
          '1. pasture area',
          '2. milk house',
          '3. maternity pens',
          '4. feed storage'
        ],
        vocabulary: 'Keywords for maps: "to your left", "directly to the left of", "located around", "in the northwest corner", "from the parking area, you go east", "on the other side", "to the north you will find", "located just beyond", "in the bottom left corner", "to the south are two circular areas"',
        answerExplanation: 'The answers are: "pasture area" (northwest corner), "milk house" (east of parking area), "maternity pens" (north of barn, beyond calf hutches), "feed storage" (south of barn, circular area).'
      }
    ]
  };

  // Summary Completion Content
  const summaryCompletionContent = {
    title: 'IELTS Listening Summary Completion: Practice & Tips',
    description: 'IELTS listening summary completion essential tips and practice. These questions are quite common in the listening test and can appear in any section. You are required to listen and select the correct words or numbers to fill in the gaps.',
    
    tips: [
      'Task: You will be given a paragraph with missing words. Your task is to fill in the gaps with words or numbers from the recording to complete the paragraph.',
      'A Summary: The paragraph is a summary. This means you are not going to hear each sentence the same as in the recording. The information in the paragraph is summarised which means it focuses on key information rather than all details.',
      'Title: The summary completion questions will have a title. This will tell you what the paragraph focuses on.',
      'Answer Order: The answers will come in order in the recording. So, you will hear the answer to question 1 and after that the answer to question 2.',
      'Word Count: You will be told how many words or number you can have in your answer. Pay attention to this information.',
      'Similar: A summary completion contains the same questions as a Sentence Completion because you are completing sentence within the summary paragraph.',
      'Predict the type of answer from the sentence given: noun, verb etc.',
      'Grammar is important. The sentence must be grammatically correct when you complete it.',
      'Keywords in the question are critical to keeping your place and spotting the correct answer.',
      'Paraphrasing: Some of the words in the summary paragraph will be paraphrased and others will not. Be ready for synonyms and re-phrasing.',
      'Precise Words: Your answer must be the precise word from the recording. You can\'t alter the word.',
      'Spelling counts. Check your spelling because words incorrectly spelled are marked wrong.'
    ],
    
    practices: [
      {
        id: 6,
        title: 'Summary Completion - Exercise 1',
        topic: 'Buckingham Palace',
        description: 'Complete the summary about Buckingham Palace using words from the recording.',
        audioUrl: '/audio/buckingham-palace.mp3',
        imageUrl: '/images/buckingham-palace.jpg',
        questions: [
          'Complete the summary below using NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          '',
          'The ________ of Buckingham Palace is one of the most famous in the world.',
          'The first recorded Royal balcony appearance took place in ________.',
          'During the Second World War, Buckingham Palace suffered nine direct bomb ________.',
          'There are ________ rooms in the palace.',
          'There are ________ doors and 760 windows in Buckingham Palace.',
          'More than 50,000 people visit the Palace annually as The Queen\'s guests at banquets, lunches, dinners, receptions and ________ parties.'
        ],
        transcript: `Buckingham Palace is The Queen's official London residence. The balcony of Buckingham Palace is one of the most famous in the world. The first recorded Royal balcony appearance took place in 1851, when Queen Victoria stepped onto it during celebrations for the opening of the Great Exhibition. During the Second World War, Buckingham Palace suffered nine direct bomb hits.

Buckingham Palace has its own chapel, post office, swimming pool, staff cafeteria, doctor's surgery and cinema. There are 775 rooms in the palace. Some rooms at Buckingham Palace have a Chinese theme. There are 1,514 doors and 760 windows in Buckingham Palace. All windows are cleaned every six weeks. More than 50,000 people visit the Palace annually as The Queen's guests at banquets, lunches, dinners, receptions and garden parties.`,
        answers: [
          'balcony',
          '1851',
          'hits',
          '775',
          '1,514',
          'garden'
        ],
        answerExplanation: 'Adapted from royal.gov.uk. The answers must be spelled correctly. "balcony" - the famous balcony where the Royal Family appears. "1851" - the year of the first appearance. "hits" - bomb hits during WWII. "775" - number of rooms. "1,514" - number of doors. "garden" - garden parties are a famous tradition at Buckingham Palace.'
      },
      {
        id: 7,
        title: 'Summary Completion - Exercise 2',
        topic: 'The Terracotta Army',
        description: 'Complete the summary about the Terracotta Army using words from the recording.',
        audioUrl: '/audio/terracotta-army.mp3',
        imageUrl: '/images/terracotta-army.jpg',
        questions: [
          'Complete the summary below using NO MORE THAN TWO WORDS for each answer.',
          '',
          'The Terracotta Army was buried with the emperor to ________ him in his afterlife.',
          'The figures date from approximately the late ________.',
          'The figures were discovered in 1974 by ________ in Xi\'an.',
          'The three pits contain more than 8,000 ________.',
          'The pits also contain 130 chariots with 520 horses and ________ cavalry horses.'
        ],
        transcript: `The Terracotta Army is a collection of terracotta sculptures depicting the armies of the first Emperor of China. It is a form of funerary art buried with the emperor in 210–209 BC and whose purpose was to protect the emperor in his afterlife.

The figures, dating from approximately the late third century BC, were discovered in 1974 by local farmers in Xi'an. The figures vary in height according to their roles, with the tallest being the generals. The figures include warriors, chariots and horses. Estimates from 2007 were that the three pits containing the Terracotta Army held more than 8,000 soldiers, 130 chariots with 520 horses and 150 cavalry horses, the majority of which remained buried in the pits nearby. Other terracotta non-military figures were found in other pits, including officials, acrobats, strongmen and musicians.`,
        answers: [
          'protect',
          'third century BC',
          'local farmers',
          'soldiers',
          '150'
        ],
        vocabulary: 'sculpture = three-dimensional work of art (for example a statue), to depict = show, illustrate, represent, funerary art = art for funerals, purpose = aim / function, afterlife = life after death, figures = a person\'s bodily shape, a copy of a person, vary = differ, warrior = soldier, chariot = a horse-drawn vehicle, majority = greater part, a pit = a hole in the ground, acrobat = an entertainer who is excellent in gymnastic achievements',
        answerExplanation: 'The answers are: "protect" - the purpose was to protect the emperor. "third century BC" - dating from the late third century BC. "local farmers" - discovered by local farmers in 1974. "soldiers" - more than 8,000 soldiers. "150" - 150 cavalry horses.'
      }
    ]
  };

  // Sentence Completion Content
  const sentenceCompletionContent = {
    title: 'IELTS Listening Practice: Sentence Completion',
    description: 'IELTS listening sentence completion questions are basically gap fill questions that require you to fill a gap in the sentence with either words or numbers or a combination of words and numbers. Use the tips below to learn the right techniques for this type of listening question.',
    
    tips: [
      'Prepare Sentences: You will have time to read through the sentences before the recording starts.',
      'Predict Answers: You can predict what type of word the answer will be, such as a verb or noun.',
      'Grammar Will Help: The sentence must be grammatically correct when you put the missing word into the sentence.',
      'Answers in Order: The answers to the questions will come in order in the recording.',
      'Answer Word Count: The instructions will always tell you how many words or numbers you can have for the answer.',
      'Keywords: The question will have useful keywords in it to help you locate the answer.',
      'Paraphrasing: Many keywords will be paraphrased so you might not hear the keywords precisely as they are shown in the question.',
      'Speed: You do not have a lot of time to prepare question by reading them, spotting keywords and also paraphrasing.',
      'Before or After Keywords: You might hear the answer before or after you hear the keyword.',
      'Guess: If you don\'t know the answer, just guess. Never leave an answer empty.',
      'Spelling counts: If your answer is spelled incorrectly, it will be marked wrong.',
      'Listen Only Once: Remember, you will hear the recording only once and you won\'t be able to pause it.'
    ],
    
    practices: [
      {
        id: 8,
        title: 'Sentence Completion - Exercise 1',
        topic: 'Autism Awareness',
        description: 'Complete the sentences below using NO MORE THAN TWO WORDS for each answer.',
        audioUrl: '/audio/autism-awareness.mp3',
        imageUrl: '/images/autism-awareness.jpg',
        questions: [
          'Complete the sentences below.',
          'Write NO MORE THAN TWO WORDS for each answer.',
          '',
          'Autism affects the way a person ____________ and responds to people.',
          'Autism Hour is when businesses agree to dim their lights and reduce background ____________.',
          'Autistic people have difficulty processing sensory information leading to sensory ____________.',
          'In a world ____________ towards neuro-typical people, autistic people can be restricted.',
          'Autism Hour also provides an opportunity for staff to learn more about autism and its effect on ____________ information.'
        ],
        transcript: `There are 700,000 autistic people in the UK. Autism is a lifelong disability which affects how a person communicates and responds to people and how they experience the world around them. Although most of the public have heard of autism, few actually understand what it is like to live with it and how to support someone with autism. Autism Hour is when businesses agree to dim their lights and reduce background noise, such as music, to create an environment that is more suitable for autistic people. Autistic people have difficulty processing sensory information leading to sensory overload which can cause great stress and even physical pain. In a world geared towards neuro-typical people, this problem can leave autistic people restricted in where they can go and what they can enjoy. Autism Hour not only opens doors to autistic shoppers and their families, it also provides an opportunity for staff members to learn more about autism which is essential if autistic people are to get the support and respect they need from society. Autism Hour is also important in bringing to light the general affect that sensory information can have on people who are not neuro-typical or who have an illness affecting their ability to cope with light or noise or any other type of sensory information.`,
        answers: [
          'communicates',
          'noise',
          'overload',
          'geared',
          'sensory'
        ],
        answerExplanation: 'Answers must be spelled correctly. "communicates" must have "s" at the end. "overload" is one word. "geared" - as in "geared towards". "sensory" - sensory information.',
        vocabulary: 'autistic = person with autism, neuro-typical = a person without autism, sensory overload = when sensory information becomes overwhelming'
      }
    ]
  };

  // Numbers Practice Content
  const numbersPracticeContent = {
    title: 'Listening Practice for Numbers',
    description: 'This lesson focuses on listening for numbers. Make sure you have a pencil and paper ready. Write down the numbers you hear. Each listening has 10 or 9 numbers.',
    
    tips: [
      'Listen carefully for the difference between teen numbers (13, 14, 15) and ty numbers (30, 40, 50)',
      'Pay attention to hundreds and thousands - numbers like 116, 332, 480',
      'For large numbers, listen for thousand separators - 2,350 means two thousand three hundred fifty',
      'Practice distinguishing between similar sounding numbers like 80,500 and 80,000',
      'Write numbers as digits, not words, to save time',
      'Use commas for thousands to keep numbers clear (e.g., 10,300)',
      'Check your answers by listening again if possible',
      'Common mistakes include mixing up 13/30, 14/40, 15/50',
      'For numbers like 80,500 - the "and" is sometimes implied'
    ],
    
    practices: [
      {
        id: 9,
        title: 'Numbers Practice - Section 1',
        topic: 'Numbers 1 to 100',
        description: 'Listen to the recording and write down the numbers you hear between 1 and 100.',
        audioUrl: '/audio/numbers-1-100.mp3',
        imageUrl: null,
        questions: [
          'Write down the numbers you hear:',
          '',
          'Question 1: _____',
          'Question 2: _____',
          'Question 3: _____',
          'Question 4: _____',
          'Question 5: _____',
          'Question 6: _____',
          'Question 7: _____',
          'Question 8: _____',
          'Question 9: _____',
          'Question 10: _____'
        ],
        transcript: `Number 8... Number 13... Number 50... Number 24... Number 47... Number 86... Number 19... Number 97... Number 17... Number 29...`,
        answers: [
          '8',
          '13',
          '50',
          '24',
          '47',
          '86',
          '19',
          '97',
          '17',
          '29'
        ],
        answerExplanation: 'These are numbers between 1 and 100. Pay attention to teen numbers (13, 17, 19) vs ty numbers (50).'
      },
      {
        id: 10,
        title: 'Numbers Practice - Section 2',
        topic: 'Numbers from 100 to 1,000',
        description: 'Listen to the recording and write down the numbers you hear between 100 and 1,000.',
        audioUrl: '/audio/numbers-100-1000.mp3',
        imageUrl: null,
        questions: [
          'Write down the numbers you hear:',
          '',
          'Question 1: _____',
          'Question 2: _____',
          'Question 3: _____',
          'Question 4: _____',
          'Question 5: _____',
          'Question 6: _____',
          'Question 7: _____',
          'Question 8: _____',
          'Question 9: _____',
          'Question 10: _____'
        ],
        transcript: `Number 116... Number 196... Number 332... Number 480... Number 390... Number 830... Number 901... Number 642... Number 589... Number 772...`,
        answers: [
          '116',
          '196',
          '332',
          '480',
          '390',
          '830',
          '901',
          '642',
          '589',
          '772'
        ],
        answerExplanation: 'These are numbers between 100 and 1,000. Pay attention to hundreds and tens places.'
      },
      {
        id: 11,
        title: 'Numbers Practice - Section 3',
        topic: 'Numbers from 1,000 to 1,000,000',
        description: 'Listen to the recording and write down the numbers you hear between 1,000 and 1,000,000.',
        audioUrl: '/audio/numbers-1000-1000000.mp3',
        imageUrl: null,
        questions: [
          'Write down the numbers you hear:',
          '',
          'Question 1: _____',
          'Question 2: _____',
          'Question 3: _____',
          'Question 4: _____',
          'Question 5: _____',
          'Question 6: _____',
          'Question 7: _____',
          'Question 8: _____',
          'Question 9: _____'
        ],
        transcript: `Number 2,350... Number 6,719... Number 10,300... Number 65,000... Number 12,450... Number 15,000... Number 28,560... Number 990,999...`,
        answers: [
          '2,350',
          '6,719',
          '10,300',
          '65,000',
          '12,450',
          '15,000',
          '28,560',
          '990,999'
        ],
        answerExplanation: 'Note: 80,500 was in the original list but missing from the audio. These are larger numbers requiring attention to thousands and hundreds.'
      }
    ]
  };

  // City Names Practice Content
  const cityNamesContent = {
    title: 'Spelling Practice for IELTS Listening: City Names',
    description: 'Spelling practice for city names and other place names, such as towns. Improve your listening and spelling by listening to the spelling of particular places and writing down the letters you hear. This is important practice for IELTS listening section 1.',
    
    tips: [
      'Writing down the letters you hear',
      'The place names will be given and then spelled',
      'Each place name will be spelled only once',
      'Pay attention to silent letters (e.g., Leicester has a silent "ce" sound)',
      'Listen carefully for double letters (e.g., Gillingham has double "l")',
      'British place names often have unique spellings that don\'t match pronunciation',
      'Practice with common British city names that frequently appear in IELTS',
      'Focus on the spelling of the ending of words (e.g., -ham, -shire, -wich)',
      'Write down each letter as you hear it to avoid forgetting'
    ],
    
    practices: [
      {
        id: 12,
        title: 'City Names Practice - 15 Towns & Cities',
        topic: 'British Town and City Names',
        description: 'Listen to the recording and write down the 15 town and city names. Each place name will be spelled only once.',
        audioUrl: '/audio/city-names.mp3',
        imageUrl: null,
        questions: [
          'Write down the city/town names you hear:',
          '',
          '1. _______________',
          '2. _______________',
          '3. _______________',
          '4. _______________',
          '5. _______________',
          '6. _______________',
          '7. _______________',
          '8. _______________',
          '9. _______________',
          '10. _______________',
          '11. _______________',
          '12. _______________',
          '13. _______________',
          '14. _______________',
          '15. _______________'
        ],
        transcript: `Birmingham - B-I-R-M-I-N-G-H-A-M
Carlisle - C-A-R-L-I-S-L-E
Chichester - C-H-I-C-H-E-S-T-E-R
Leicester - L-E-I-C-E-S-T-E-R
Peterborough - P-E-T-E-R-B-O-R-O-U-G-H
Truro - T-R-U-R-O
Wolverhampton - W-O-L-V-E-R-H-A-M-P-T-O-N
Amersham - A-M-E-R-S-H-A-M
Framlingham - F-R-A-M-L-I-N-G-H-A-M
Gillingham - G-I-L-L-I-N-G-H-A-M
Goole - G-O-O-L-E
Ormskirk - O-R-M-S-K-I-R-K
Painswick - P-A-I-N-S-W-I-C-K
Rochdale - R-O-C-H-D-A-L-E
Sawbridgeworth - S-A-W-B-R-I-D-G-E-W-O-R-T-H`,
        answers: [
          'Birmingham',
          'Carlisle',
          'Chichester',
          'Leicester',
          'Peterborough',
          'Truro',
          'Wolverhampton',
          'Amersham',
          'Framlingham',
          'Gillingham',
          'Goole',
          'Ormskirk',
          'Painswick',
          'Rochdale',
          'Sawbridgeworth'
        ],
        answerExplanation: 'These are British town and city names. Pay attention to silent letters: Leicester (pronounced "Lester"), Worcester (not in this list but similar pattern). Note the double "l" in Gillingham and the unique spelling of Sawbridgeworth.'
      }
    ]
  };

  // Names Practice Content
  const namesPracticeContent = {
    title: 'Listening Practice for English Names',
    description: 'These two listening practices focus on listening for English names. This practice is important for students preparing for their IELTS test as well as other students studying English or planning to move to the UK.',
    
    tips: [
      'Listen for titles (Mr, Mrs, Miss, Ms, Dr, Sir) - if there is a title, you must write it',
      'Write down the complete name given in the recording',
      'Some names will be spelled out letter by letter, others will not',
      'Pay attention to the difference between similar sounding names (e.g., Sean vs Shaun)',
      'Note that British names may have different spellings than American names',
      'Initials like "C J" are common - write them with spaces',
      'Capital letters matter for proper names - ensure correct capitalization',
      'Practice common English names to become familiar with them',
      'Some names may have silent letters (e.g., Bartholomew has a silent "h")',
      'Listen carefully for double letters (e.g., Billings has double "l")'
    ],
    
    practices: [
      {
        id: 13,
        title: 'Names Practice - Exercise 1',
        topic: 'Common English Names - Part 1',
        description: 'Listen to the recording and write down the 10 names you hear.',
        audioUrl: '/audio/names-practice-1.mp3',
        imageUrl: null,
        questions: [
          'Write down the names you hear:',
          '',
          '1. _______________',
          '2. _______________',
          '3. _______________',
          '4. _______________',
          '5. _______________',
          '6. _______________',
          '7. _______________',
          '8. _______________',
          '9. _______________',
          '10. _______________'
        ],
        transcript: `David Darwin
Mrs Alice Smith
Balthazar Jones
Sara Bartholomew
Sean Bean
Mr Frank Allenson
A R Beevers
James Chichester
Mary Schooling
Sir Paul McKellen`,
        answers: [
          'David Darwin',
          'Mrs Alice Smith',
          'Balthazar Jones',
          'Sara Bartholomew',
          'Sean Bean',
          'Mr Frank Allenson',
          'A R Beevers',
          'James Chichester',
          'Mary Schooling',
          'Sir Paul McKellen'
        ],
        answerExplanation: 'Notice the titles: "Mrs" for a married woman, "Mr" for a man, "Sir" for a knight. Note the spelling of "Bartholomew" (has a silent "h") and "Chichester" (a British place name used as a surname). "Sean" is pronounced "Shawn".'
      },
      {
        id: 14,
        title: 'Names Practice - Exercise 2',
        topic: 'Common English Names - Part 2',
        description: 'Listen to the recording and write down the 10 names you hear. Think about the mistakes you made in the previous practice and see if you can improve.',
        audioUrl: '/audio/names-practice-2.mp3',
        imageUrl: null,
        questions: [
          'Write down the names you hear:',
          '',
          '1. _______________',
          '2. _______________',
          '3. _______________',
          '4. _______________',
          '5. _______________',
          '6. _______________',
          '7. _______________',
          '8. _______________',
          '9. _______________',
          '10. _______________'
        ],
        transcript: `Dr Davis
Richard Chamberlain
Miss Victoria Halley
Mr C J Billings
Robert Powers
Emily Jackson
Nora Ingalls
Mrs Caroline Castle
Charles Pringle
Emma Ford`,
        answers: [
          'Dr Davis',
          'Richard Chamberlain',
          'Miss Victoria Halley',
          'Mr C J Billings',
          'Robert Powers',
          'Emily Jackson',
          'Nora Ingalls',
          'Mrs Caroline Castle',
          'Charles Pringle',
          'Emma Ford'
        ],
        answerExplanation: 'Note the titles: "Dr" (Doctor), "Miss" (unmarried woman), "Mrs" (married woman), "Mr" (man). "C J" are initials - write them with a space. "Chamberlain" has a silent "ch" at the end. "Pringle" is a common British surname. "Ford" is a common surname (like Henry Ford).'
      }
    ]
  };

  // ========== READING SECTION - TRUE/FALSE/NOT GIVEN ==========
  const tfngExercise1 = {
    title: 'True False Not Given - Exercise 1: The Thames Tunnel',
    description: 'Practice reading for IELTS True False Not Given questions with this passage about The Thames Tunnel. This exercise contains 8 questions to test your understanding.',
    passage: `The Thames Tunnel

The Thames Tunnel was a tunnel built under the River Thames in London. It was the first subaqueous tunnel ever built and many people were so amazed that they exaggerated their description of it calling it the Eight Wonder of the World at the time it was opened. It was opened in 1843 to pedestrians only and people came from far and wide to see the marvel. The day it was first opened, it attracted five thousand people to enter the tunnel and walk its length of almost 400 metres. The Thames Tunnel was used by people from all classes. Most working class people used it for its functional use of crossing from one side of the river to the other as they went to work each day, while for the middle classes and upper classes, it was a tourist experience. In the age of sail and horse-drawn coaches, people voyaged a long way to visit the tunnel, but this was not enough to make the tunnel a financial success. It had cost over £500,000 to complete which in those days was a considerable amount of money. However, even though it attracted about 2 million people each year, each person only paid a penny to use it. The aim had been for the tunnel to be used by wheeled vehicles to transport cargo so that it could bring in a profit. But this failed and the tunnel eventually became nothing more than a tourist attraction selling souvenirs and a subaqueous pathway connecting either side of the river. walkway. However, in 1865, the tunnel became part of the London Underground railway system which continues to be its use today.`,

    questions: [
      'The Thames Tunnel was the first tunnel ever built under a river.',
      'The Thames Tunnel was the Eighth Wonder of the World.',
      'People were drawn from all over to see the Thames Tunnel.',
      'The tunnel was used more by the middle and upper classes.',
      'People were able to travel by sea or land in those days.',
      'The aim of the tunnel was to turn a profit as a tourist attraction.',
      'Statues of the tunnel could be bought as souvenirs.',
      'The tunnel is no longer used as a pedestrian walkway to cross the river.'
    ],

    answers: [
      'TRUE - "It was the first subaqueous tunnel ever built"',
      'FALSE - "...many believed it was the Eighth Wonder of the World at the time" - The word "believed" implies it is not factual information.',
      'TRUE - "...drew people from far and wide" - "draw" means to attract.',
      'NOT GIVEN - The passage does not state how much each class used the tunnel.',
      'TRUE - "In the age of sail and horse-drawn coaches" - sail = sea travel, horse-drawn coaches = land travel.',
      'FALSE - "The aim had been for the tunnel to be used by wheeled vehicles to transport cargo so that it could bring in a profit."',
      'NOT GIVEN - There is no information about what types of souvenirs were sold.',
      'TRUE - "In 1865, the tunnel became part of the London Underground system which continues to be its use today."'
    ],

    answerExplanations: [
      'You might not know the word "subaqueous" but "subway" means a way under the ground. "Aqua" is connected with water. Even if you don\'t know words, you can make an educated guess.',
      'The Wonders of the World are places that have been agreed upon internationally as wonders. The passage says "many believed" which implies it is not factual information.',
      '"from all over" is an idiomatic expression meaning from many places around the world.',
      'For this answer to be false, the passage would need to show which class used the tunnel more and which used it least.',
      '"in the age of" means "at this time in history" - people could travel by sea (boat) or by land (coaches).',
      'The aim was for cargo transport, not tourism.',
      'The passage only mentions "selling souvenirs" without specifying what types.',
      'The passage explicitly states it became part of the London Underground system.'
    ]
  };

  const tfngExercise2 = {
    title: 'True False Not Given - Exercise 2: Pyramid Building',
    description: 'Practice reading for IELTS True False Not Given questions with this passage about Pyramid Building. This exercise contains 8 questions to test your understanding.',
    passage: `Pyramid Building

The most famous pyramid is the Great Pyramid of Giza which is actually only one of over a hundred surviving pyramids. There is a long-standing question about how the pyramids were built given the lack of technology over 4,000 years ago but scientists are piecing together the puzzle. The blocks which make up the pyramids were hewn from quarries and then transported to the pyramids for construction. This was an incredible feat considering the distance that the raw materials had to travel and their enormous weight. The transportation of the materials was either by river using a boat or by land using a wooden sledge. Given the softness of the ground, the wheel would have been of little use had it been invented at that time. It is believed that the sand in front of the sledge was wet with water in order to facilitate the movement of the sledge and reduce friction. These sledges were pulled manually or sometimes by using beasts of burden depending on the ease at which the sledges could move over the ground. Interestingly, two thousand years after the pyramid building era of the Ancient Egyptians, the Romans moved stones using similar techniques at Baalbek. Once the blocks arrived at the pyramid construction site, it is thought they were moved into place using a ramp and pulley system.

The Old Kingdom period in Ancient Egyptian history is also known as the pyramid building era. The Ancient Egyptians achieved the most remarkable feats of building work which have still not been surpassed, particularly given the primitive technology used to build them. There is nothing remotely mystical or magical about how the pyramids were built as is commonly thought. Further still, while popular belief is that the Great Pyramid was built using slave labour, this theory has since been debunked. The first building made in a pyramid shape is thought to be the Stepped Pyramid which consists of six steps placed on top of each other in a pyramid shape to create the world's first superstructure. The credit to finally achieving a smooth sided pyramid goes to Imhotep, an architect commissioned by King Sneferu. The pyramids were not an instant achievement, but the achievement of trial and error.`,

    questions: [
      'The controversy over the method used in the construction of the pyramids has been solved by scientists.',
      'It is possible that Ancient Egyptians could have lubricated paths to aid transportation by sledge.',
      'Sleds were dragged by animals not humans.',
      'The Romans learned the techniques of moving huge stones from the Ancient Egyptians.',
      'The building work of the Ancient Egyptians is unrivalled.',
      'Many people believe that magic may have been used by the Ancient Egyptians to build the pyramids.',
      'The Great Pyramid was built using slave labour.',
      'It took more than one attempt to get the construction of the pyramids right.'
    ],

    answers: [
      'FALSE - "...scientists are piecing together the puzzle" - currently a work in progress, not finished.',
      'TRUE - "It is believed that the sand in front of the sledge was wet with water in order to facilitate the movement of the sledges and reduce friction."',
      'FALSE - "These sledges were pulled manually or sometimes by using beasts of burden" - manually = by hand (people), beast of burden = animal.',
      'NOT GIVEN - The passage gives no information about who the Romans learned from. "using similar techniques at Baalbek" - "at" means Baalbek is a place, not a person.',
      'TRUE - "The Ancient Egyptians achieved the most remarkable feats of building work which have still not been surpassed"',
      'TRUE - "There is nothing remotely mystical or magical about how the pyramids were built as is commonly thought" - meaning: many people think there is magic.',
      'FALSE - "...while popular belief is that the Great Pyramid was built using slave labour, this theory has since been debunked." debunked = discredited.',
      'TRUE - "The pyramids were not an instant achievement, but the achievement of trial and error."'
    ],

    answerExplanations: [
      'The passage states scientists are "piecing together the puzzle" which means it is ongoing, not solved.',
      'The word "facilitate" means to make easier. The water was used to reduce friction.',
      '"Manually" means by hand (humans). "Beasts of burden" refers to animals like donkeys or oxen.',
      'The passage only states the Romans used "similar techniques" at a location, not that they learned from Egyptians.',
      '"Unrivalled" means not surpassed or exceeded.',
      '"As is commonly thought" indicates this is a common belief, even though it\'s not true.',
      '"Debunked" means proven false - this theory has been discredited.',
      '"Trial and error" means multiple attempts were made before success.'
    ]
  };

  const tfngExercise3 = {
    title: 'True False Not Given - Exercise 3: Beethoven',
    description: 'Practice reading for IELTS True False Not Given questions with this passage about Beethoven. This exercise contains 6 questions to test your understanding.',
    passage: `Beethoven

Composer Ludwig van Beethoven was born on or near December 16, 1770, in Bonn, Germany. He is widely considered the greatest composer of all time. Sometime between the births of his two younger brothers, Beethoven's father began teaching him music with an extraordinary rigour and brutality, which affected him for the rest of his life. On a near daily basis, Beethoven was flogged, locked in the cellar and deprived of sleep for extra hours of practice. He studied the violin and clavier with his father as well as taking additional lessons from organists around town. Beethoven was a prodigiously talented musician from his earliest days and displayed flashes of the creative imagination that would eventually reach farther than any composer's before or since.

In 1804, Beethoven was completing his third symphony, which he at first named "Bonaparte" in honour of Napoleon. However, when later that year Napoleon proclaimed himself Emperor, Beethoven was so disappointed that he renamed his composition "Eroica". This work, his greatest and most original to date, debuted in Vienna in 1805. It was so unlike anything heard before that through weeks of rehearsal, the musicians could not figure out how to play it. At the same time as he was composing these great and immortal works, Beethoven was trying hard to come to terms with a shocking and terrible fact, one that he tried desperately to conceal. He was going deaf. At the turn of the century, Beethoven struggled to make out the words spoken to him in conversation.

Despite his extraordinary output of beautiful music, Beethoven was frequently miserable throughout his adult life. Beethoven died on March 26, 1827, at the age of 56.`,

    questions: [
      'It is not known exactly when Beethoven was born.',
      'Beethoven\'s father took a forbearing approach to teaching his son music.',
      'Beethoven\'s father was also a talented musician.',
      'Beethoven\'s Symphony No. 3 was inspired by a famous man.',
      'Beethoven\'s Symphony No. 3 premiered just before Napoleon became Emperor.',
      'In the early 1800\'s Beethoven struggled to follow a conversation.'
    ],

    answers: [
      'TRUE - "born on or near December 16, 1770" - the exact date is not known.',
      'FALSE - "with an extraordinary rigour and brutality" - forbearing means tolerant and patient, which is the opposite.',
      'NOT GIVEN - The passage does not state whether his father was talented as a musician.',
      'NOT GIVEN - For a false answer, the passage would need to state the inspiration was not a famous man.',
      'FALSE - The symphony debuted in 1805, the year after Napoleon was made Emperor.',
      'TRUE - "At the turn of the century, Beethoven struggled to make out the words spoken to him in conversation."'
    ],

    answerExplanations: [
      '"On or near" indicates the exact date is uncertain.',
      '"Rigour" means harshness or severity. "Forbearing" means patient and tolerant - the opposite of what is described.',
      'The passage mentions he taught music but does not comment on his talent level.',
      '"Original work" means it has not been done before. This is not connected to inspiration.',
      'The timeline: Napoleon became Emperor in 1804, the symphony debuted in 1805.',
      '"Make out" means to understand or hear clearly.'
    ]
  };

  const tfngExercise4 = {
    title: 'True False Not Given - Exercise 4: Spam Messaging',
    description: 'Practice reading for IELTS True False Not Given questions with this passage about Spam Messaging. This exercise contains 6 questions to test your understanding.',
    passage: `Spam Messaging

SPAM, as every user of mobile phones in China is aware to their intense annoyance, is a roaring trade in China. Its delivery-men drive through residential neighbourhoods in "text-messaging cars", with illegal but easy-to-buy gadgetry they use to hijack links between mobile-phone users and nearby communications masts. They then target the numbers they harvest, blasting them with spam text messages before driving away. Mobile-phone users usually see only the wearisome results: another sprinkling of spam messages offering deals on flats, investment advice and dodgy receipts for tax purposes.

Chinese mobile-users get more spam text messages than their counterparts anywhere else in the world. They received slightly more than 300 billion of them in 2013, or close to one a day for each person using a mobile phone. Users in bigger markets like Beijing and Shanghai receive two a day, or more than 700 annually, accounting for perhaps one-fifth to one-third of all texts. Americans, by comparison, received an estimated 4.5 billion junk messages in 2011, or fewer than 20 per mobile-user for the year—out of a total of more than two trillion text messages sent.`,

    questions: [
      'In China, SPAM text messaging is a successful business.',
      'People\'s phone numbers are collected through the use of technology which cannot be readily bought.',
      'In no other country do people receive more Spam texts than in China.',
      'In 2013, the number of SPAM texts increased considerably to reach at least 300 billion.',
      'The majority of all texts received in Shanghai and Beijing are SPAM.',
      'In 2011, Americans sent more texts than anywhere else in the world.'
    ],

    answers: [
      'TRUE - "roaring trade" means successful business.',
      'FALSE - "easy-to-buy gadgetry" - the technology can be readily bought.',
      'TRUE - "Chinese mobile-users get more spam text messages than their counterparts anywhere else in the world."',
      'NOT GIVEN - The statement says the number "increased to reach". The passage only states the number, not whether it increased.',
      'FALSE - "accounting for perhaps one-fifth to one-third of all texts" - this is not a majority.',
      'NOT GIVEN - The passage only compares spam messages, not total texts sent.'
    ],

    answerExplanations: [
      '"Roaring trade" is an idiom meaning booming or very successful business.',
      '"Easy-to-buy" directly contradicts "cannot be readily bought".',
      '"Counterparts anywhere else in the world" means all other countries.',
      'The passage gives the number but doesn\'t state if it was an increase from previous years.',
      'One-fifth to one-third (20-33%) is not a majority (over 50%).',
      'The passage only gives information about spam messages, not total texts sent by Americans.'
    ],

    vocabulary: [
      'intense = strong / extreme',
      'roaring business = successful business / booming business',
      'residential = suburban',
      'gadget = device',
      'harvest information = collect / gather',
      'sprinkling = smattering',
      'counterparts = equals / colleagues',
      'spam messages = junk messages'
    ]
  };

  // ========== MATCHING HEADINGS CONTENT ==========
  const matchingHeadingsContent = {
    title: 'IELTS Reading Matching Headings: Practice & Tips',
    description: 'Practice and useful tips for tackling IELTS reading matching headings questions. These are one of the most challenging types of question in the reading test. They are certainly the most lengthy and time consuming. Below you will find tips for what these questions require and how to approach them. And there is a reading practice lessons as well.',
    
    tips: [
      'You can choose whether to skim read (read for gist, not detail) the passage first or the headings. There is no right or wrong way. You decide what works for you. Most teachers will recommend you read the headings first.',
      'One advantage to the computer reading test is that the headings and passage are side by side on the screen. For the paper test, they are on different pieces of paper.',
      'Count how many headings you have and how many paragraphs. You will usually have more headings than paragraphs.',
      'There is only ever one heading that works for each paragraph.',
      'The headings are basically titles for the paragraph. This means the heading summarises the aim of the entire paragraph.',
      'This isn\'t about matching words or just locating information in the paragraph, it\'s about the aim of the whole paragraph.',
      'Pay attention to headings that are similar in meaning or contain similar words. Some headings can appear very similar so you\'ll have to pay attention to the way in which they differ.',
      'Spend time paraphrasing keywords in the possible headings. You will use keywords and key paraphrases to decide which paragraphs or headings are possible. Then you analyse deeper meaning before deciding your answer.',
      'Read the paragraphs to find the main idea – what is the direction and aim of the paragraph?',
      'Distinguish between main ideas and extra information or examples in the paragraph.',
      'There might be a heading which does match some information or one sentence in the paragraph, but that doesn\'t mean it is the answer. Your aim is to find the heading that matches the aim of the whole paragraph, not just one sentence. So, look out for that when you choose your heading.',
      'Not all headings will be used.',
      'Your answer will be a roman numeral, for example, I or VI. Do not write words.',
      'Remember one correct answer is only worth one point so think about how much time you are spending on these questions. They do take time to answer.',
      'In the paper test, you\'ll see the list of headings first. On the computer test, the headings and passage will be side by side, which is easier.'
    ],
    
    practices: [
      {
        id: 15,
        title: 'Matching Headings - Practice 1: The Greenhouse Effect',
        topic: 'The Greenhouse Effect',
        description: 'Choose the correct heading (I-IX) for paragraphs A, B, C and D in the passage below.',
        headingOptions: [
          'I. Changing temperatures',
          'II. The greenhouse',
          'III. Global warming',
          'IV. Use of a greenhouse',
          'V. Werne\'s research',
          'VI. Earth\'s atmosphere',
          'VII. Our choices',
          'VIII. Effects of carbon dioxide',
          'IX. Climates around the world'
        ],
        passage: `A. A greenhouse is a house made entirely of glass: both walls and roof are glass. One of the main purposes of a greenhouse is to grow tomatoes, flowers and other plants that might struggle to grow outside. A greenhouse stays warm inside, even during winter. Sunlight shines in and warms the plants and air inside. But the heat is trapped by the glass and cannot escape. So during the daylight hours, it gets warmer and warmer inside a greenhouse, and stays quite warm at night too.

B. The Earth experiences a similar thing to a greenhouse. Gases in the atmosphere such as carbon dioxide do what the roof of a greenhouse does. During the day, the Sun shines through the atmosphere. Earth\'s surface warms up in the sunlight. At night, Earth\'s surface cools, releasing the heat back into the air. But some of the heat is trapped by the greenhouse gases in the atmosphere. That is what keeps our Earth a warm and comfortable 59 degrees Fahrenheit, on average.

C. However, gas molecules, called greenhouse gases, which absorb thermal infrared radiation, are rising and this is what is altering the climate system. Carbon dioxide (CO2) and other greenhouse gases act like a blanket, absorbing IR radiation and preventing it from escaping into outer space. The greenhouse effect, combined with increasing levels of greenhouse gases, produces climate change on a global scale, which is expected to have profound implications for all countries around the world.

D. Many scientists agree that the damage to the Earth\'s atmosphere and climate is past the point of no return or that the damage is near the point of no return. Josef Werne\'s, an associate professor at the department of geology & planetary science at the University of Pittsburgh, told Live Science that we have three ways to move forward. Firstly to do nothing and live with the consequences. Secondly, to adapt to the changing climate (which includes things like rising sea level and related flooding protection). Thirdly, mitigate the impact of climate change by aggressively enacting policies that actually reduce the concentration of CO2 in the atmosphere.`,

        questions: [
          'Paragraph A: _____',
          'Paragraph B: _____',
          'Paragraph C: _____',
          'Paragraph D: _____'
        ],

        answers: [
          'A = II. The greenhouse',
          'B = VI. Earth\'s atmosphere',
          'C = III. Global warming',
          'D = VII. Our choices'
        ],

        answerExplanations: [
          'Paragraph A = II. The answer can\'t be IV because the paragraph did contain information about how the greenhouse was used, such as growing vegetables. But that information was not the main aim of the paragraph, it was additional information. If the aim was about its uses, there would be more information about using it for various purposes – but that isn\'t the aim. The answer can\'t be I about Changing Temperatures because although temperature is often mentioned, it is only to illustrate how the greenhouse works. The aim isn\'t to discuss temperatures and how they change. The paragraph actually talked about what it was made of, what it was used for and how it works. The best title would be "The greenhouse" because the paragraph gives a clear overview of it.',
          'Paragraph B = VI. The answer isn\'t I because the paragraph actually explains that this natural effect keeps the temperature of Earth stable. The answer is VI which explains how Earth\'s atmosphere works to keep our planet at a stable temperature.',
          'Paragraph C = III. The answer isn\'t VIII (Effects of carbon dioxide) because the paragraph isn\'t aimed at explaining carbon dioxide and in fact only mentions it along side other greenhouse gases. The answer isn\'t IX (Climates around the world) because although climates are affected around the world, the whole paragraph aim isn\'t to discuss climates in different countries.',
          'Paragraph D = VII. The answer isn\'t V because the paragraph doesn\'t actually discuss Werne\'s research (which means how he did his studies and the problems with his studies), but rather his opinion about what options we have to deal with our changing world climate.'
        ]
      },
      {
        id: 16,
        title: 'Matching Headings - Practice 2: The History of Pasta',
        topic: 'The History of Pasta',
        description: 'Choose the correct heading (I-VIII) for paragraphs A, B, C and D in the passage below.',
        headingOptions: [
          'I. A theory dismissed',
          'II. Marco Polo in China',
          'III. Is pasta really a popular Italian dish?',
          'IV. China is the origin of pasta',
          'V. The real roots',
          'VI. An Arabian taste sensation',
          'VII. The common belief of the origins of pasta',
          'VIII. How about China?'
        ],
        passage: `A. Worldwide, pasta has become synonymous with Italian cuisine. Italian immigrants themselves brought pasta everywhere they went. While it is true that the most famous varieties and recipes of cooking pasta really do come from Italy, surprisingly, the actual origin of pasta lies elsewhere!

B. One of the more popular theories of the arrival of pasta in Italy was published in the 'Macaroni Journal' by the Association of Food Industries. It states that pasta was brought to Italy by Marco Polo via China. Polo ventured to China in the time of the Yuan Dynasty (1271-1368) and the Chinese had been consuming noodles as early as 3000 B.C. in the Qinghai province. There is even some evidence there of 4,000-year-old noodles made from foxtail and broomcorn millet.

C. Unfortunately, there are problems with this theory, least of which is that the noodles they were making in China aren't technically considered pasta. Polo also described Chinese noodles as being like "lagana", which implies he was possibly already familiar with a pasta-like food before going to China. Further, in 1279, there was a Italian Genoese soldier that listed in the inventory of his estate a basket of dried pasta. However, Polo did not come back from China until 1295. Furthermore, the modern pasta we know today was first described in 1154 by an Arab geographer, Idrisi, as being common in Sicily. So Marco Polo could not have brought pasta to Italy via China. It was already in Italy at that time.

D. Most food historians believe that Arabs (specifically from Libya) are to be credited for bringing pasta, along with spinach, eggplant and sugar cane, to the Mediterranean. In the Talmud, written in Aramaic in the 5th century AD, there is a reference to pasta being cooked by boiling. It is thought, then, that pasta was introduced to Italy during the Arab conquests of Sicily in the 9th century AD, which had the interesting side effect of drastically influencing the region's cuisine. It also known that by the 12th century, the Italians had learned from the Arabs methods for drying pasta to preserve it while traveling. Further support for this theory can be found by the fact that, in many old Sicilian pasta recipes, there are Arab gastronomic introductions. One example of cross cultural recipes is Barida, which is an old Arab recipe with Roman clear roots.`,

        questions: [
          'Paragraph A: _____',
          'Paragraph B: _____',
          'Paragraph C: _____',
          'Paragraph D: _____'
        ],

        answers: [
          'A = VII. The common belief of the origins of pasta',
          'B = VIII. How about China?',
          'C = I. A theory dismissed',
          'D = V. The real roots'
        ],

        answerExplanations: [
          'A = VII. This paragraph is all about what we think is the origins of pasta. It opens up the topic of where pasta really comes from. The answer cannot be III (Is pasta really a popular Italian dish?) because it is not about how popular pasta is as a dish within Italy. The answer isn\'t I (A theory dismissed) because the paragraph isn\'t about a theory, but about a common belief – a common opinion or thought. The answer cannot be V (The real origins of pasta) because the paragraph aim is not to talk about the real origins but instead just to introduce the idea that it isn\'t Italy.',
          'B = VIII. This paragraph offers yet another common belief which is that pasta comes from China. For this reason, "How about China" which means is China the real origin fits with the whole aim of the paragraph. The answer isn\'t I (A theory dismissed) because although the paragraph does present a theory, it does not aim to dismiss it. The answer isn\'t II (Marco Polo in China) because although it mentions Marco Polo, the aim is not to discuss his time in China. The answer isn\'t IV (China is the origin of pasta) because the paragraph isn\'t aimed to convince us that China is the origin but rather to introduce the theory that it could be.',
          'C = I. This paragraph is all about dismissing the theory that was introduced in the previous paragraph – that pasta was introduced to Italy by Marco Polo when he came from China.',
          'D = V. We do see the word "roots" used in the paragraph. We do see the paragraph is about an Arab food. But which heading works? The key is meaning: "taste sensation" means a powerful, incredible, delicious experience of flavour in an ingredient or dish. This paragraph gives no description of this and it certainly isn\'t an aim of the paragraph to talk about something full of amazing flavour. "Roots" - we use the word "root" to talk about an origin of something. This paragraph really does talk about the origin of pasta. It is about the real roots of pasta. In the paragraph, the word "root" as in reference to one particular dish that had Roman roots with Arab influence. This word acted like a distractor – to confuse the reader about the real heading.'
        ]
      }
    ]
  };

  // ========== READING SECTION - MULTIPLE CHOICE ==========
  const multipleChoiceReadingContent = {
    title: 'IELTS Reading Multiple Choice Practice & Essential Tips',
    description: 'Practice lessons and tips for IELTS Reading Multiple Choice Questions. These types of questions appear often in the IELTS reading test. They require you to locate information in a reading passage and decide on the best answer option from a given list. They are easier than they seem.',
    
    tips: [
      'The answers will come in order in the passage. This means that the answer to question 1 will come first and then the answer to question 2 will come after that.',
      'You might find language or information relating to all answer options. This is why most people get confused about multiple choice questions. Many people think they will only see information about one option.',
      'Even if most or all options are mentioned, only one option will be the right one. There is only ever one possible answer.',
      'To choose the right answer means you really need to read for meaning rather than just matching words.',
      'The answer options, if they are present in the passage, will not be in order necessarily.',
      'Analyse the questions and answer options.',
      'Make sure you understand the meaning fully before you look for the answer in the passage.',
      'Not analysing the question and answer options is the main reason people choose the wrong answer and also the main reason they waste time.',
      'Analysing the question and answer options is a time saver.',
      'Correct answer in IELTS reading are not about matching words, but about deeper meaning.',
      'Prepare possible paraphrases and synonyms in the questions and answer options before you check the passage.',
      'Spot keywords in the question and answers.',
      'Take time to notice the difference between the answer options.',
      'Scan the passage for the paraphrases, synonyms, keywords and similar information.',
      'Once you locate the information in the passage, return to the questions and check all the answer options again.',
      'Focus on the difference in meaning between the options.',
      'You might also notice similarities between options – that is one way you end up choosing the wrong question. Some answer options might be similar with only small differences. So, pay attention to it all.',
      'Then return to the passage to make your choice.',
      'Read the surrounding sentences before deciding the answer - there might be more information in the passage that you need to know about.',
      'And remember, your answer must be a letter.'
    ],

    questionTypes: [
      'Multiple Choice Question: A question to answer - You are given a question with three possible answers. Your answer must be a letter.',
      'Multiple Choice Question: A sentence to complete - Each answer option offers a possible ending to the sentence. Your answer must be a letter.'
    ],

    practices: [
      {
        id: 17,
        title: 'Multiple Choice - Practice 1: All About Rice',
        topic: 'All About Rice',
        description: 'An easy introduction to MC questions for you.',
        passage: `The first rice may have been grown in East and South Asia as long as 15,000 years ago, when people began to settle in river deltas and domesticated wild rice. Today it is grown practically everywhere, except Antarctica! Rice is grown on flooded land and on dry land, in tropical rain forests of Africa and in arid deserts of the Middle East, on coastal plains and on the Himalayan mountains.

In the year 2003, the world produced about 589 million tonnes of paddy rice. Most of that (about 534 million tones) was grown in Asia. In 2002, it is estimated that rice fields covered almost 1.5 million square km of land. Again, most of those fields are in Asia – around 1.3 million square km.`,

        questions: [
          '1. Where is rice grown?',
          'A. everywhere',
          'B. almost everywhere',
          'C. mainly on flood lands and coastal plains',
          '',
          '2. In 2002, rice fields covered about ……………',
          'A. 1.5 million square miles of land.',
          'B. 1.3 million square km of land in China.',
          'C. 1.5 million square km of land in the world.'
        ],

        answers: [
          '1. B',
          '2. C'
        ],

        answerExplanations: [
          '1. B - This is testing both your vocabulary and general understanding of the passage. In the passage, it says "rice is grown everywhere except Antarctica". This means it is grown everywhere except one place. This means it isn\'t actually grown everywhere because there is one place where it isn\'t grown. So, the answer can\'t be A, even though there are matching words between question and passage. This is how many people choose the wrong answer because they match words and forget to match meaning instead. If you aren\'t sure of an answer, guess. Never leave an answer box empty.',
          '2. C - This question is a typical example of how confusing options can be if you don\'t spot the keywords. Is the answer option about square miles or square km – that is a difference you needed to spot. And is the passage giving information about land used in China or in the world. All these can be subtle differences and easy to miss.'
        ]
      },
      {
        id: 18,
        title: 'Multiple Choice - Practice 2: GM Foods',
        topic: 'GM Foods',
        description: 'A more challenging multiple choice passage about genetically modified foods.',
        passage: `Genetically modified food is produced from plants which have had their genes tweaked in the lab. Scientists "cut and paste" a gene from another organism into a plant's DNA to give it a new characteristic. This can be to increase yield or to allow the plant to exist in a more hostile environment than normal. Pro-GM scientists say this means cheaper more plentiful food but opponents argue we do not know the consequences of meddling with nature.

Farmers have modified their crops for thousands of years by crossing similar species. However, modern GM is controversial. Critics say the modified crops could "escape" and cross with wild plants, with unknown consequences. They also argue that more chemicals are used on some GM fields which may have a negative impact on wildlife. And while no study has found GM food to be harmful to humans, opponents say it is too soon to be sure.

A group of biotechnology experts say it is time to loosen Europe's draconian regulations on genetically modified crops. In a report released today they argue that genetically modified crops have been used safely for decades, so no longer need to be automatically treated as unsafe. They also say that genetically modified crops should be reclaimed from multinational companies and treated as a public good.`,

        questions: [
          '1. The genetic makeup of GM foods has been………',
          'A. twisted.',
          'B. altered.',
          'C. cut.',
          '',
          '2. By genetically engineering plants, they are……………',
          'A. likely to increase in size.',
          'B. able to produce more.',
          'C. not able to exist in difficult conditions.',
          '',
          '3. One issue with GM plants is the potential to………',
          'A. cause undetermined consequences by damaging the fauna.',
          'B. infect wild plants with unknown results.',
          'C. cross pollinate.',
          '',
          '4. It is thought, by specialists in biotechnology that policies governing GM crops should be…….',
          'A. tightened.',
          'B. relaxed.',
          'C. reviewed.',
          '',
          '5. GM foods ought to be ……….',
          'A. reclaimed for the use of multinational companies.',
          'B. used safely.',
          'C. no longer privatised.'
        ],

        answers: [
          '1. B',
          '2. B',
          '3. C',
          '4. B',
          '5. C'
        ],

        vocabulary: [
          'tweak = adjust, modify, regular (the synonyms relate to the context)',
          'cross with = reproduce with, cross pollinate',
          'meddling with = interfering with',
          'loosened = relaxed',
          'regulations = rules / policies',
          'experts = specialists',
          'released = made public / issued / announced',
          'draconian = strict / tough / harsh'
        ],

        answerExplanations: [
          '1. B - "tweaked" and "altered" are synonyms. "Twisted" is too extreme and "cut" is only part of the process.',
          '2. B - The passage says "to increase yield" which means to produce more. The other options are incorrect.',
          '3. C - The passage mentions modified crops could "cross with wild plants" which is cross pollination.',
          '4. B - The passage says "it is time to loosen" which means relax the regulations.',
          '5. C - The passage says they "should be reclaimed from multinational companies and treated as a public good" which means no longer privatised.'
        ],

        extraInfo: 'ADVICE: GM food topic can appear in IELTS Writing Task 2 and also Speaking Part 3. Always use my reading passages to review language and ideas for other parts of the IELTS Test.'
      }
    ]
  };

  // ========== READING SECTION - YES/NO/NOT GIVEN ==========
  const ynngContent = {
    title: 'IELTS Reading Yes No Not Given Practice with Tips & Techniques',
    description: 'Yes, No, Not Given IELTS Reading Questions – useful techniques and practice lessons to maximise your score and help you save time in your reading test. These questions are often difficult for people to tackle so learning the right way will help you score points.',

    tips: [
      'Are IELTS YNNG questions the same as IELTS TFNG questions? They have the same techniques, the same approach, but there is a slight difference in the reading passage. When the passage is about facts and information then the question type will be TFNG because these questions are about matching statements with information in the passage. But when the passage contains a writer\'s opinion or claims, then the question type is YNNG because these questions are matching statements with what the writer thinks or believes as shown in the passage. To sum up: TFNG = factual passage = matching statements with information. YNNG = an opinion passage = matching statements with a writer\'s opinion/claims.',
      'YES means that the full meaning of the question statement can be found in the passage and the meanings are the same.',
      'NO means that the full meaning of the question statement is actually wrong and the passage shows it is wrong/incorrect/opposite/contradicted.',
      'NOT GIVEN means that the information in the question statement isn\'t found in the passage so we can\'t say if it is correct or incorrect information. The passage doesn\'t give enough information to choose Yes or No.',
      'Your written answer must be YES or NO or NOT GIVEN. You can write these words in capital letters or lower case. But you can\'t write True instead of Yes. If the answer is Yes, but you write True, then your answer is wrong. Always pay attention to that – don\'t lose valuable points.',
      'The same as TFNG questions, the YNNG answers will appear in order in the passage. This means you will find the answer to question 2 after the answer to question 1. This is useful to know because it will save you time searching through the whole passage.',
      'Take time reading the question.',
      'Notice keywords in the question - words that will help you locate the answer in the passage and words that might challenge the answer – words that make a subtle difference to the meaning.',
      'Think about synonyms and paraphrases that could be used to describe the information given in the question statement.',
      'Scan the passage and pay attention to keywords and paraphrases from the question.',
      'When you find the area that the answer is located in, read around that area. Read the sentences before and after.',
      'Remember, you can highlight words in the passage to help you.',
      'After reading the area where the answer is located in the passage, go back to the question and start comparing them for meaning.',
      'Do not try to match words only. IELTS reading is about deeper meaning.',
      'Your aim isn\'t to understand the whole passage, but to locate answers and then analyse the deeper meaning of those few sentences relating to the question.',
      'Be careful of comparative questions. The comparisons need to be the same in the question and passage.',
      'Be careful of quantifiers, such as "all" and "some". ALL means 100%, SOME means it is not 100%.'
    ],

    practices: [
      {
        id: 19,
        title: 'Yes No Not Given - Practice: Richard, the Lionheart',
        topic: 'Richard, the Lionheart',
        description: 'Practice Yes/No/Not Given questions with this passage about King Richard I of England.',
        passage: `King Richard I of England is one of the most iconic kings of England, known as the Crusader King and also as Richard the Lionheart. He spent practically all his reign outside England fighting wars in the Middle East and France to the point that England must have seemed like a foreign, distant land to him. It seems strange to us today to consider a King of England so wholly detached from the country that he represented and ruled. To pay for his wars and crusades, he taxed the English so heavily that is caused widespread discontent amongst the populace. While it can be said that he was a peerless warrior in battle, he was a poor King of England. He has often been criticised not only for his neglect of England and the welfare of the common person, but also for squandering the lives of so many of his followers as they followed him into battles far from their homeland. And yet remarkably, many English people still remember him quite fondly as a chivalrous king who was the epitome of a knight with bravery and military skill.`,

        questions: [
          'King Richard idolised fame.',
          'While King, Richard never resided in England.',
          'King Richard looked down on the English culture.',
          'Many English people did not agree with being taxed so much.',
          'He was a fighter beyond compare.',
          'The people who followed him into battle were common people from England.',
          'King Richard did not place much consideration on the value of a human life.',
          'King Richard is considered by all English people as a courageous knight.'
        ],

        answers: [
          '1. NOT GIVEN',
          '2. NO',
          '3. NOT GIVEN',
          '4. YES',
          '5. YES',
          '6. NOT GIVEN',
          '7. YES',
          '8. NO'
        ],

        answerExplanations: [
          '1. NOT GIVEN - There is no information about Richard\'s personal feelings about fame.',
          '2. NO - He spent much of his reign outside England, but not all his reign. "Practically all" means almost all, not all.',
          '3. NOT GIVEN - The passage shows that Richard probably didn\'t connect much with the English culture because he spent so much time abroad, it doesn\'t give any information about whether he lacked respect (looked down on) the English culture.',
          '4. YES - the passage shows the population of England showed "widespread discontent" with the heavy taxes. "widespread" means many thought this, but not all.',
          '5. YES - peerless = beyond compare (there were no peers who were his equal)',
          '6. NOT GIVEN - the passage shows King Richard did not care about the welfare of the common people. But we do not know who his followers were precisely.',
          '7. YES - in the passage: "squandering the lives of so many of his followers" – meaning to waste people\'s lives in battle.',
          '8. NO - The challenge with this question was the word "all" in the question and "many" in the passage.'
        ],

        vocabulary: [
          'reign = time in power / sovereignty',
          'to tax heavily = to take a lot of money in tax',
          'widespread discontent = many were not happy',
          'the populace = people living in a particular country',
          'peerless = unequalled / unrivalled',
          'warrior = fighter / soldier',
          'battle = war / conflict',
          'squandering = to waste something in a foolish or reckless manner',
          'the epitome of = the best possible example of something'
        ]
      }
    ]
  };

  // ========== READING SECTION - SENTENCE COMPLETION ==========
  const sentenceCompletionReadingContent = {
    title: 'IELTS Reading Sentence Completion Practice with Essential Tips',
    description: 'IELTS Reading Sentence Completion Practice with Essential Tips. These questions require excellent paraphrasing skills and the ability to locate information quickly. Below are two practice reading lessons with techniques for tackling the questions.',

    tips: [
      'Tip 1: Grammar - In the question, you can see there is a gap missing in the sentence. Grammar will definitely help you because the answer you add to the sentence must make the whole sentence grammatically correct. The grammar will tell you what type of answer fits in the gap. For example, if you see the word "a" before the gap, you know you are looking for a noun. We use articles (a/the) before some compound nouns, such as a book shop. Compound nouns are individual nouns made of two or more words. We also use an article before an adjective with a noun, such as a white feather. The article "a" also means you are looking for a countable noun, not an uncountable noun. For example, we cannot have a traffic congestion because traffic congestion is uncountable.',
      'Tip 2: Keywords - The question will also have keywords which you need to identify. These keywords will help you locate the area of the passage where that information is located. These words can sometimes be words that have no paraphrase, in which case you can look directly for that word. For example, the word "penguin" has no equal so if it is in the question, you\'ll also find it in the passage. Other keywords might be paraphrased so prepare those paraphrases before you try to locate the answer in the passage.',
      'Tip 3: Paraphrasing - To locate the answer in the passage. This requires the use of your paraphrasing skills and this can involve synonyms. You might be looking in the passage for a single word with the same or similar meaning as in the question. However, paraphrasing isn\'t always about synonyms (matching words). Instead, it might be that the meaning is found scattered in various sentences.',
      'Tip 4: Read Around the Keywords - When you locate the sentence or sentences with the keywords in the passage, you must read around that area. Keywords are mostly about helping you locate the area of the passage that the answer is in. But deciding the correct answer might mean reading a few sentences before and after the keywords. So, you will read backwards and forwards in the passage to understand all details and context before deciding your answer.',
      'Tip 5: Writing answers correctly - The answer will always be a word, words or numbers taken directly from the passage. You do not paraphrase or alter the word for your answer. You must write the precise word as it is shown in the passage. And don\'t forget that spelling counts. Luckily, on the computer test, you can copy and paste words.',
      'Tip 6: Don\'t waste time - Also note – answers will come in order in the passage. This is essential to know so that you don\'t waste time reading all over the passage for an answer. If you struggle to find the answer to question 4, carry on to question 5 and then come back to question 4 after. Once you have the answer to question 5, you will know that you can find question 4 answer in the area of the passage between the answer for 3 and 5.'
    ],

    practices: [
      {
        id: 20,
        title: 'Sentence Completion - Practice 1: Neighbourhood Badgers',
        topic: 'Neighbourhood Badgers',
        description: 'Complete the sentences below using no more than two words and/or a number.',
        passage: `Badgers in gardens can be a delight. A nightly treat that householders all over the country look forward to. But for some, they are at the very least unwelcome visitors, threatening cherished pristine lawns and carefully cultivated vegetables because badgers find food where they can and have little respect for people's efforts in gardening. Often unseen and unheard, they wander quietly into gardens at night, feeding on the earthworms, grubs, snails and slugs they find in lawns and borders before moving on. In their wake, they leave only the slightest clues, an odd small snuffle hole here and there, showing where they obviously sought out their nightly treat. If it is suspected there is a badger sett in a garden, expert advice should be sought. It's easy to know if there is one by the many holes you'll find which tunnel down to various living chambers in their underground sett. People should not try to interfere with them in this situation, as it is against the law. Badgers will not cause people any harm or pass on diseases so they should be left to live quietly in their residence but their presence should be reported to an expert who can rehome them if necessary.

There are some fascinating facts about badgers. Badgers are extremely clean animals and do not take food into their setts preferring to eat out in the open and retain a clean living area underground. They are remarkably suited to their purpose of digging, having powerful claws and limbs. American badgers even have a third eyelid that keeps out grains of sand and soil. Interestingly, the idiom we know as "to badger someone" comes from an old sport of Badger Baiting rather than their actual character. The idiom actually means to tell someone to do something or to question them again and again and again – incessantly without let up. No wonder badgers sometimes get such a bad rep.`,

        questions: [
          'While badgers are seen as a delight by some people, others see them as ………………',
          'A ………….. is a sure way to know a badger has visited a garden.',
          'It is best not to …………… with badgers if they have made a home in your garden.',
          'Badgers do not transmit ………….. to humans.',
          'Badgers are built for digging and some also have a protective ……………….. .',
          'The idiom "to badger someone" is unrelated to the ……………….. of badgers.'
        ],

        answers: [
          'unwelcome visitors',
          'snuffle hole',
          'interfere',
          'diseases',
          'third eyelid',
          'character'
        ],

        vocabulary: [
          'cherished = to hold something dear to you / close to your heart',
          'pristine = immaculate / unspoilt',
          'lawn = garden',
          'in their wake = what is left behind when someone leaves',
          'grubs = larvae of insects',
          'note, the word "grub" is also a very informal slang word sometimes used meaning "food"',
          'snuffle = sniff / a noise made with the nose',
          'badger sett = a badger home which has underground chambers connected by tunnels',
          'limbs = arms and legs'
        ],

        answerExplanations: [
          '1. unwelcome visitors - The passage says "for some, they are at the very least unwelcome visitors".',
          '2. snuffle hole - The passage says "an odd small snuffle hole here and there, showing where they obviously sought out their nightly treat".',
          '3. interfere - The passage says "People should not try to interfere with them".',
          '4. diseases - The passage says "Badgers will not cause people any harm or pass on diseases".',
          '5. third eyelid - The passage says "American badgers even have a third eyelid".',
          '6. character - The passage says "the idiom... comes from an old sport... rather than their actual character".'
        ]
      },
      {
        id: 21,
        title: 'Sentence Completion - Practice 2: Water Pollution',
        topic: 'Water Pollution',
        description: 'Complete the sentences below with the correct word(s) taken from the passage. Use no more than three words and/or a number.',
        passage: `Clean and plentiful water provides the foundation for prosperous communities. We rely on clean water to survive, yet right now we are heading towards a water crisis. Changing climate patterns are threatening lakes and rivers, and key sources that we tap for drinking water are being overdrawn or tainted with pollution. NRDC experts are helping to secure safe and sufficient water for people and the environment by:

Promoting water efficiency strategies to help decrease the amount of water wasted;
Protecting our water from pollution by defending the Clean Water Act and advocating for solutions like green infrastructure;
Helping prepare cities, counties and states for water-related challenges they will face as a result of climate change; and
Ensuring that waterways have enough water to support vibrant aquatic ecosystems.
Dirty water is the world's biggest health risk, and continues to threaten both quality of life and public health in the United States. When water from rain and melting snow runs off roofs and roads into our rivers, it picks up toxic chemicals, dirt, trash and disease-carrying organisms along the way. Many of our water resources also lack basic protection, making them vulnerable to pollution from factory farms, industrial plants, and activities like fracking. This can lead to drinking water contamination, habitat degradation and beach closures. NRDC is working to protect our water from pollution by:

Drawing on existing protections in the Clean Water Act, and working to ensure that the law's pollution control programs apply to all important waterways, including headwater streams and wetlands, which provide drinking water for 117 million Americans;
Improving protections to reduce pollutants like bacteria and viruses, which threaten Americans' health and well being; and
Establishing new pollution limits for top problem areas, such as sources of runoff and sewage overflows.`,

        questions: [
          'The keystone to any thriving society is to have …………..and ……….. water.',
          'With the increase in water pollution a ………………. is imminent.',
          'One way to help keep water clean is by the construction of …………………..',
          'Dirty water can be a ………………. as chemicals and other pollutants enter the water supply.',
          'Due to a lack of ……………….., some of our water resources are at risk of pollution.'
        ],

        answers: [
          'clean plentiful',
          'water crisis',
          'green infrastructure',
          'health risk',
          'basic protection'
        ],

        vocabulary: [
          'foundation = keystone / bedrock',
          'prosperous = thriving / flourishing',
          'key = vital / critical / major',
          'tainted = contaminated / polluted / fouled / spoiled',
          'advocating = backing / supporting',
          'vibrant = alive / energetic',
          'toxic = lethal / deadly / poisonous'
        ],

        answerExplanations: [
          '1. clean plentiful - "Clean and plentiful water provides the foundation for prosperous communities." You should not put the word "and" in your answer because it would make the sentence grammatically incorrect. You must have both words for a correct answer.',
          '2. water crisis - "yet right now we are heading towards a water crisis."',
          '3. green infrastructure - "solutions like green infrastructure"',
          '4. health risk - "Dirty water is the world\'s biggest health risk"',
          '5. basic protection - "Many of our water resources also lack basic protection"'
        ]
      }
    ]
  };

  // ========== READING SECTION - SUMMARY COMPLETION ==========
  const summaryCompletionReadingContent = {
    title: 'IELTS Reading Summary Completion Practice with Tips',
    description: 'Summary Completion Question in IELTS reading. You should skim read the passage and then spend time reading through the summary to predict answers and prepare paraphrases.',

    tips: [
      'This type of question is similar to sentence completion questions that are very common in IELTS Reading. However, the difference is that sentence completion questions give you a list of separate sentences relating to different parts of the passage with missing words. But for Summary Completion questions, you are given a short paragraph (not separate sentences) with missing words.',
      'There are two kinds of summary completion questions in IELTS Reading.',
      'Type 1: With a Word List - This means you are given a summary paragraph with missing words and below that summary is a box with a collection of words. Each word is represented by a letter. You will use the given words in the box to fill in the gaps. There might be more words that you need in the box. Your answer will be a letter, not a word.',
      'Type 2: Without a Word List - This means you are given a summary paragraph with missing words and you must find the missing words in the passage. The word should be written precisely as it is shown in the passage. You will be given instructions about how many words can be used to fill the gaps.',
      'The answers will almost always come in order. But do be ready for the occasional time when they don\'t.',
      'Start with the first gap and then progress step by step to the other gaps.',
      'Although this is a paragraph, you can tackle each sentence separately.',
      'Pay attention to keywords in the sentence you are tackling.',
      'One type of keyword is a name or technical word that will be the same in the question and the passage.',
      'Another type of keyword is one that will most likely be paraphrased. Not all paraphrases mean the use of synonyms. Sometimes it just means the meaning is rewritten in a different way and you can\'t match it word for word.',
      'If you are asked for choose a word from a list, your answer will be a letter (not a word). Your answer would be marked wrong if you wrote the word.',
      'If you are asked for take the word from the passage, you must spell it correctly or your answer will be marked wrong.'
    ],

    practices: [
      {
        id: 22,
        title: 'Summary Completion - Practice: Fermented Foods',
        topic: 'Fermented Foods',
        description: 'Complete the summary below by selecting the right word from the list (A-J) below. Write the correct letter for your answer.',
        passage: `Fermentation is a process in which an agent [typically bacteria and yeast] cause an organic substance to break down into simpler substances; especially, the anaerobic [no oxygen] breakdown of sugar into alcohol, i.e. the making of beer or wine. Fermentation in food processing is the conversion of carbohydrates (plant foods) to alcohols and carbon dioxide, or organic acids, using yeasts, bacteria, or a combination thereof, under anaerobic (no oxygen) conditions. Fermentation usually implies that the action of microorganisms is desirable, and the process is used to produce alcoholic beverages such as wine, beer, and cider. Fermentation is also employed in the leavening of bread, and for preservation techniques to create lactic acid in sour foods such as sauerkraut, dry sausages, kimchi and yogurt, or vinegar (acetic acid) for use in pickling foods.

Nobel Prize winner Dr. Elie Metchnikoff was one of the first scientists to recognize the benefits of eating fermented foods. His research in the early 1900's focused on the Bulgarians. He believed the daily ingestion of yogurt was a major contribution to their superior health and longevity.

Bulgarians perfected the art of detoxifying and preserving milk (removing the lactose and predigesting the proteins) and transforming it into yogurt and cheese. For centuries, Europeans used wine as a source of clean, durable water. The Caucasians used Kefir grains for the same purpose: detoxify milk products to make Kefir. A range of vegetables were also fermented to preserve them from spoilage in many countries by individual households, such as kimchi in Korea and sauerkraut in Germany, both being predominantly made from cabbage. However, the fermentation process was too lengthy and not uniform so for wide scale food production manufacturers turned to pickling instead. Most of the pickled products found on our supermarket shelves today were at one time a fermented product, including kimchi, sauerkraut, catsup (Chinese word for pickled fish brine) and English pickles made from either vegetables or fruit.`,

        wordList: [
          'A. detoxifying',
          'B. cheese',
          'C. longevity',
          'D. yoghurt',
          'E. wine',
          'F. pickling',
          'G. vegetables',
          'H. cheese',
          'I. longevity',
          'J. vegetables'
        ],

        summaryText: `At the start of the 20th century, Dr. Elie Metchnikoff put forward his belief that the 1 ……………… and good health of Bulgarians could be attributed to eating fermented food each day. By 2……………. and preserving milk, they were able to convert it into 3……………… and 4…………………. In other parts of Europe, fermented 5……………… was consumed as a replacement for clean water. People used to ferment 6……………….. which gave them a longer lifespan but nowadays mass production favours pickling.`,

        questions: [
          '1. _____',
          '2. _____',
          '3. _____',
          '4. _____',
          '5. _____',
          '6. _____'
        ],

        answers: [
          '1. C',
          '2. A',
          '3. B',
          '4. H',
          '5. E',
          '6. J'
        ],

        answerExplanations: [
          '1. C - longevity - The passage states "superior health and longevity".',
          '2. A - detoxifying - The passage states "detoxifying and preserving milk".',
          '3. B - cheese - The passage states "transforming it into yogurt and cheese".',
          '4. H - cheese - The same as #3, yogurt and cheese.',
          '5. E - wine - The passage states "Europeans used wine as a source of clean, durable water".',
          '6. J - vegetables - The passage states "A range of vegetables were also fermented".'
        ]
      }
    ]
  };

  // ========== READING SECTION - SHORT ANSWER QUESTIONS ==========
  const shortAnswerContent = {
    title: 'IELTS Reading Short Answer Questions Practice with Tips',
    description: 'IELTS Reading Short Answer Questions: Essential Tips and Practice Lesson. This question type requires you to locate a word, words or numbers in the passage which are precise answers to a given question.',

    tips: [
      'You must locate information in the passage which is the answer to a question.',
      'This is the type of question that most of you will be familiar with.',
      'Spend time preparing the questions.',
      'Look for keywords that can help you locate the information in the passage.',
      'Note keywords that help you know what type of answer you are looking for – such as a noun.',
      'The answers for short answer questions always come in order in the passage.',
      'Your answer will be a word or words from the passage. Do not change the word – it must be as it is written in the passage.',
      'The instructions will tell you how many words/numbers you can have for your answer.',
      'Spelling counts – if you spell the word incorrectly, your answer is wrong.'
    ],

    practices: [
      {
        id: 23,
        title: 'Short Answer Questions - Practice: The History of Painted Eggs',
        topic: 'The History of Painted Eggs',
        description: 'Answer the questions below. Choose no more than two words from the passage for each answer.',
        passage: `Easter eggs, aka Paschal eggs in some parts of the world, are special eggs that are often given to celebrate Easter or springtime. The practice of decorating eggshell dates back thousands of years. Ostrich eggs with engraved decoration that are 60,000 years old have been found in Africa. As far as historians know, the act of egg decoration did not have any religious origin and was just decorative. In Persian culture, eggs were sometimes painted by the whole family as they sat together preparing for the arrival of Spring and their New Year. And even today, people enjoy painting eggs without being at all religious.

Eventually, eggs which often symbolised Spring become connected to the celebration of Easter. In Europe, it was traditional to use dyed and painted chicken eggs at Easter, but a modern custom is to substitute chocolate eggs, or plastic eggs filled with confectionery such as jelly beans. Easter eggs are a widely popular symbol of new life in Bulgaria, Poland, Romania, Russia, Ukraine, and other Central European countries where they are concealed in the garden for children to find. The British Queen, Queen Victoria, was also known to enjoy egg hunts, organising them for her children inside Kensington Palace in London which brought the tradition to the UK. Eggs, in general, were a traditional symbol of fertility and rebirth. Some magic rituals, these days, often use eggs to promote fertility and restore virility (of the body and mind); and to foresee the future. The Easter Bunny is another symbol associated with Easter but the origin is unclear. Some people believe that the Easter Bunny came about because both eggs and rabbits are often seen as symbols of fertility. Others believe the Easter Bunny originated in Germany where it judged how well behaved or not well behaved children had been by the start of the season. The naughty or nice theme for children can be seen again in the tradition of Santa Clause at Christmas. Nowadays, in many countries, the Easter bunny is responsible for bringing the children their Easter eggs.

In Russia, the incredible Peter Carl Faberge took the concept of eggs as decoration to another level. He created 50 Imperial Easter Eggs between 1885 to 1916. His remarkable eggs were made of gold, silver and other materials and were inlaid with pearls and precious gems, each egg completely unique and exquisite. Many of them have since disappeared from the world. A great loss to the world of art.`,

        questions: [
          '1. What is another name for an Easter Egg?',
          '2. What type of egg was used for decoration in the ancient world?',
          '3. What type of sweets were artificial eggs sometimes filled with?',
          '4. Where are egg hunts often conducted as part of a hide and seek game in some countries?',
          '5. By and large, what two things did eggs represent?',
          '6. What determined if children had been naughty or nice at the beginning of Spring.'
        ],

        answers: [
          '1. Paschal eggs',
          '2. Ostrich eggs',
          '3. jelly beans',
          '4. garden',
          '5. fertility rebirth',
          '6. Easter Bunny'
        ],

        vocabulary: [
          'rituals = ceremonies',
          'confectionery = sweets',
          'decorating = adorning',
          'came about = originated',
          'engraved = carved / etched'
        ],

        answerExplanations: [
          '1. Paschal eggs - The passage states "Easter eggs, aka Paschal eggs".',
          '2. Ostrich eggs - The passage states "Ostrich eggs with engraved decoration that are 60,000 years old".',
          '3. jelly beans - The passage states "filled with confectionery such as jelly beans".',
          '4. garden - The passage states "where they are concealed in the garden for children to find". "Kensington Palace" is not the answer because this only refers to the UK rather than some countries.',
          '5. fertility rebirth - The passage states "a traditional symbol of fertility and rebirth". Using "and" would be wrong – just two words are needed. No punctuation is needed.',
          '6. Easter Bunny - The passage states "the Easter bunny is responsible for bringing the children their Easter eggs."'
        ]
      }
    ]
  };

  // ========== WRITING SECTION CONTENT ==========
  const writingTask1Content = {
    title: 'IELTS Writing Task 1 Academic: Overview & Practice',
    description: 'Overview of the IELTS Writing Task 1 Academic Test with essential tips, model answers, and practice materials to help you achieve a high band score.',
    
    testInfo: {
      title: 'IELTS Writing Task 1 Test Information',
      points: [
        'You have one hour in total for your whole writing test (both task 1 and task 2).',
        'IELTS recommend you spend no more than 20 mins on writing task 1.',
        'You can manage your own time in the writing test. The one hour is yours to use as you wish.',
        'The instructions say "Write at least 150 words" – you need to write over 150 words.',
        'Writing Task 1 is a report, not an essay.',
        'Writing Task 1 counts for about 33% of your writing marks.',
        'There are four marking criteria each worth 25%: Task Achievement / Coherence & Cohesion / Vocabulary / Grammar'
      ]
    },

    taskTypes: [
      { name: 'Bar Charts', description: 'Charts that compare and contrast data. Data is divided into columns representing categories and compared with between two groups, such as men and women.' },
      { name: 'Line Graphs', description: 'A graph that shows trends of two lines over a period of time. The lines represent numbers in two or more categories. This shows increases, decreases and other changes.' },
      { name: 'Tables', description: 'A table containing data that can be complex with many categories divided into rows and columns. These could be compare/contrast or change over time.' },
      { name: 'Pie Charts', description: 'These show proportions of a whole divided into different categories. Sometimes compare/contrast and sometimes change over time.' },
      { name: 'Diagrams', description: 'It could be a process of how something works or how it is made. Or it could be a cycle such as a life cycle or water cycle. Diagrams contain stages and steps.' },
      { name: 'Maps', description: 'A map of a town/city or report or a floor plan of a building. Describing the layout, position of places and special features on the map. Sometimes there are two maps to compare in different time periods.' }
    ],

    markingCriteria: [
      { name: 'Task Achievement', description: 'The examiner will check your information, overview, detail and accuracy.' },
      { name: 'Coherence and Cohesion', description: 'Your organisation of information, your paragraphing and your use of linking devices will be marked.' },
      { name: 'Lexical Resource (Vocabulary)', description: 'Your use of vocabulary, your spelling and the number of mistakes will affect your score.' },
      { name: 'Grammatical Range and Accuracy', description: 'You will get a band score for your sentence structures, tenses, control of grammar and the number of mistakes.' }
    ],

    tips: [
      'Analyse the chart and identify all key features',
      'Highlight your key features in an overview',
      'Support your body paragraph with data (numbers and dates if possible)',
      'Avoid putting in information which is wrong',
      'Avoid an opinion – write a factual report',
      'Write over 150 words (penalty for under word count)',
      'Plan where to put your information',
      'Have four body paragraphs (structure and paragraphing)',
      'Use a range of linking devices',
      'Avoid mistakes with linking words',
      'Use referencing (this, it, etc)',
      'Use a range of vocabulary (useful task 1 vocabulary)',
      'Use vocabulary for presenting accurate data',
      'Understand collocations (matching verbs with nouns)',
      'Avoid spelling mistakes',
      'Don\'t use the wrong words or informal language',
      'Use a range of sentence structures',
      'Use the right tense for the chart given to you',
      'Use the right word order (adjective + noun / verb + adverb)',
      'Avoid mistakes (see how mistakes affect your score)',
      'Use the right punctuation'
    ],

    mapModelAnswer: {
      title: 'IELTS Writing Maps: Model Answer, Tips & Vocabulary',
      description: 'Below is an IELTS Writing Task 1 Map Model Answer with Great Tips and also Vocabulary. The IELTS Map Model Answer is Band Score 9 and helps you see the structure, key features and language.',
      
      tips: [
        'Types of IELTS Maps: Changes in Towns, Changes in a Resort, Places with Multiple Buildings and Features, Building Plans',
        'Grammar Tenses for Map Writing: Always check the date on the maps. If the map is dated in the past, use past tense. If it shows a future plan, use future forms.',
        'Map KEYS and Compass Points: Sometimes your map will have a key. Always check if the map shows north.',
        'Structure & Paragraphing: Introduction, Overview, Body Paragraph 1, Body Paragraph 2, Body Paragraph 3 (optional)',
        'Overview: All overviews in writing task 1 are critical to your score and are the most important paragraph.',
        'Body Paragraphs: Your division of information for body paragraphs will depend on what your maps show.'
      ],

      modelAnswer: `The three maps illustrate how Meadowside village and Fonton, which is a nearby town, have developed from 1962 to the present.

Overall, both Fonton and Meadowside village increased in size over the years until they eventually merged together, at which point Meadowside became a suburb. Furthermore, there have been significant changes to infrastructure, housing and facilities over the period given.

In 1962, both Meadowside and Fonton were completely separate with no roads or rail connecting them. While Fonton had a railway line running to the north, Meadowside, located to the west of Fonton, only had a small road from the west.

By 1985, Meadowside had expanded and the small road had become a main road. A further main road had been built to connect the village to Fonton. Within Meadowside, a superstore, leisure complex and housing estate had been developed. By this time, Fonton had also grown in size.

Currently, Meadowside is known as Meadowside Suburbs after joining with Fonton. Between both places, a hotel, station and business park have been built on either side of the railway line.`,

      modelAnswerComments: [
        'It isn\'t often that you will have three body paragraphs for your IELTS Writing Task 1 report. But this map has three time periods so it makes sense to have these body paragraphs.',
        'It could be possible to divide the information of body paragraphs into: Body Paragraph 1 – roads and railway, Body Paragraph 2 – land and buildings.',
        'There is no right or wrong way to organise information into body paragraphs. You are being marked on being logical in how you organise information.',
        'The length of all writing task 1 should be between 170 and 190 words. A longer report will be marked down for not selecting features and getting lost in detail.'
      ],

      vocabulary: [
        'Location Language: to the north, to the south, to the east, to the west, located, situated, positioned, adjacent to, next to, opposite, beyond, between, in the centre, on the left-hand side, on the right-hand side',
        'Change Language: expanded, extended, developed, constructed, built, established, transformed, converted, replaced, demolished, removed, enlarged, increased in size',
        'Infrastructure Language: road, railway line, main road, motorway, footpath, bridge, tunnel, station, airport, port, harbour',
        'Building Language: housing estate, residential area, commercial area, industrial area, leisure complex, superstore, supermarket, business park, hotel, school, hospital, church, museum, gallery'
      ]
    }
  };

  const writingTask2Content = {
    title: 'IELTS Writing Task 2: Essay Tips & Strategies',
    description: 'Learn how to write a high-scoring IELTS Writing Task 2 essay with essential tips, planning strategies, and when to give your opinion.',
    
    testInfo: {
      title: 'IELTS Writing Task 2 Test Information',
      points: [
        'You have one hour in total for your whole writing test (both task 1 and task 2).',
        'IELTS recommend you spend at least 40 mins on writing task 2.',
        'You can manage your own time in the writing test. The one hour is yours to use as you wish.',
        'The instructions say "Write at least 250 words" – you need to write over 250 words.',
        'Writing Task 2 is an essay.',
        'Writing Task 2 counts for about 67% of your writing marks.',
        'There are four marking criteria each worth 25%: Task Response / Coherence & Cohesion / Vocabulary / Grammar'
      ]
    },

    essayTypes: [
      { name: 'Opinion Essay', description: 'You are asked to give your opinion on a topic. Instructions include: "Do you agree or disagree?", "To what extent do you agree?", "What is your opinion?"' },
      { name: 'Discussion Essay', description: 'You are asked to discuss both sides of an issue. Instructions include: "Discuss both views and give your opinion", "Discuss both sides of this argument".' },
      { name: 'Advantages/Disadvantages Essay', description: 'You are asked to discuss the pros and cons of a topic. Instructions include: "What are the advantages and disadvantages?", "Do the advantages outweigh the disadvantages?"' },
      { name: 'Problem/Solution Essay', description: 'You are asked to identify problems and suggest solutions. Instructions include: "What are the causes and solutions?", "What problems does this cause and how can they be solved?"' },
      { name: 'Direct Questions Essay', description: 'You are asked to answer specific questions. Instructions include: "Why is this happening? What effects will it have?"' }
    ],

    whenToGiveOpinion: {
      title: 'When to Give Your Opinion',
      description: 'To know whether you should put your opinion in your essay or not, read the instructions carefully. If you fail to give your opinion when it is asked for, it means you failed to complete the task.',
      requiresOpinion: [
        '“…do you agree or disagree?” – it means you should give your opinion',
        '“…do you think…?” – it means you should give your opinion',
        '“… your opinion…?” – it means you should give your opinion',
        '“…what is your view?” – it means you should give your opinion',
        '“Do the advantages outweigh the disadvantages?” – this is asking for your opinion (your answer)',
        '“Is this positive or negative?” – this is asking for you to choose and explain your opinion',
        '“Do you think this is a good thing?” – this is asking you to evaluate if something is good or bad'
      ],
      doesNotRequireOpinion: [
        '“Discuss both sides” – you are only required to discuss the two sides impartially',
        '“What possible solutions are there to these problems?” – you are only required to offer possible solutions',
        '“What are the advantages and disadvantages to this?” – you only need to state the advantages and the disadvantages'
      ]
    },

    tips: [
      'Should I spend time planning my essay? Yes, you should. 50% of your marks are based on your ability to answer the essay question directly, present relevant ideas, have clear supporting points to extend the main ideas, to organise your ideas and have logical paragraphing.',
      'How much time should I spend planning? I advise you to spend at least 5 minutes planning. You must practice planning your essay and calculate how long it really takes you to create a strong plan.',
      'What should I plan before I start writing? You should have a clear outline of the following: identifying the issues in the essay question, brainstorming main ideas, choosing the best main ideas, planning supporting points, organising paragraphs.',
      'Should I practice planning my essays at home before my test? Yes, definitely. There is a skill to good logical essay planning which you need to practice.',
      'Where can I write my plan? You can write your plan on the question paper. The examiner only sees the answer sheet. For the computer test, you\'ll have extra paper for planning.',
      'Don\'t put your opinion unless you are asked to give it',
      'If the question asks what you think, you MUST give your opinion to get a good score',
      'Don\'t leave your opinion until the conclusion',
      'Don\'t sit on the fence – take a clear position',
      'Keep the same position throughout your essay',
      'Always start with a clear introduction that paraphrases the question and states your position',
      'Each body paragraph should have a clear topic sentence and supporting details',
      'Use a range of linking words to connect your ideas',
      'Provide specific examples to support your arguments',
      'Write a clear conclusion that summarises your main points',
      'Proofread your essay for grammar and spelling errors',
      'Avoid memorised phrases – the examiner wants to see your own language',
      'Don\'t write too much – aim for 270-290 words for task 2'
    ],

    planningTips: {
      title: 'Essay Planning Tips',
      points: [
        'Plan for at least 5 minutes before writing',
        'Identify the issues in the essay question',
        'Brainstorm main ideas',
        'Choose the best main ideas (more ideas does not mean a better score)',
        'Plan supporting points',
        'Organise paragraphs logically',
        'Write your plan on the question paper'
      ]
    }
  };

  const paraphrasingContent = {
    title: 'How to Paraphrase Successfully in IELTS',
    description: 'Paraphrasing in IELTS is essential for a high score in IELTS. This page contains tips on paraphrasing to maximise your score. For IELTS Writing Task 2, paraphrasing is critical to your score for essay writing.',
    
    tips: [
      '1. Using Synonyms: In IELTS one way to paraphrase is to use synonyms. This shows the examiner your range of vocabulary for any given topic. The wider your range of vocabulary, the higher your band score. BUT, only if you don\'t make mistakes.',
      '2. Not All Words Need Changing: Not all words need to be changed for a high score in IELTS. High band score successful candidates (band 7 and over) know when to paraphrase and when to keep words the same.',
      '3. Avoiding Mistakes: The more mistakes you make with vocabulary in IELTS writing and speaking, the lower your score will be. Paraphrasing is a skill. Synonyms do not have exactly the same meaning.',
      '4. Changing the Word Form: Another way to paraphrase sentences is to change the form of the word. This means we use the same words as IELTS but change their form.',
      '5. Changing Sentence Structure: Another way to paraphrase successfully is to change the order of words in a sentence. This means changing the structure of the sentence.'
    ],

    examples: [
      {
        original: 'The reasons for increasing levels of pollution are the development of industry and air travel.',
        paraphrased: 'The causes of rising levels of pollution are the growth and expansion of industry as well as the number of people travelling by air.',
        changes: 'causes = reasons, increasing = rising, the development of = the growth and expansion of, and = as well as, air travel = travelling by air'
      },
      {
        original: 'Many people are unhealthy because they fail to eat well and exercise.',
        paraphrased: 'Many people have poor health as they are failing to eat well and are not exercising enough.',
        changes: 'unhealthy = poor health, fail = are failing, exercise = are exercising, because = as'
      }
    ],

    bandScoreRequirements: {
      vocabularyRange: {
        band5: 'minimum range',
        band6: 'adequate range',
        band7: 'sufficient range',
        band8: 'wide range'
      },
      numberOfErrors: {
        band5: 'frequent errors & problems with meaning',
        band6: 'some errors, no problems with meaning',
        band7: 'few errors',
        band8: 'most sentences are error free'
      }
    },

    practice: [
      'Practice paraphrasing common IELTS topics',
      'Learn to identify which words can be safely changed',
      'Focus on changing word forms rather than always using synonyms',
      'Practice changing sentence structures (e.g., changing from active to passive voice)',
      'Learn common collocations and word families for IELTS topics',
      'Avoid over-paraphrasing – keep some key terms the same',
      'Read model essays to see how high-scoring candidates paraphrase'
    ]
  };

  const commonTopicsContent = {
    title: '20 Common Essay Topics for IELTS Writing Task 2',
    description: 'Below is a list of the 20 most common IELTS essay topics that appear in writing task 2 with subtopics. Although the essay questions change, the subject of the essays often remains the same.',
    
    topics: [
      { name: 'Art', subtopics: ['censorship of art and artists', 'creativity', 'art at school', 'benefits of art for individuals and society', 'funding'] },
      { name: 'Business & Money', subtopics: ['small vs large business', 'international business', 'family run business', 'management and leadership', 'success in business', 'business and technology', 'skills vs knowledge for business', 'materialism and consumerism'] },
      { name: 'Communication & Personality', subtopics: ['technology and communication', 'family and communication', 'face to face vs long distance communication', 'types of communication', 'development of character and personality', 'innate or developed personalities', 'female / male characters'] },
      { name: 'Crime & Punishment', subtopics: ['prisons vs rehabilitation', 'capital punishment vs other types of punishment', 'criminals – what makes a criminal', 'major vs minor crime', 'crime and technology', 'teenagers and crime', 'role of policemen', 'men and women in law enforcement'] },
      { name: 'Economics', subtopics: ['cash vs credit cards', 'saving vs spending', 'globalisation and economy', 'world economic issues', 'economic progress and success'] },
      { name: 'Education', subtopics: ['children and education', 'relevant subjects', 'education and technology', 'role of teachers', 'discipline and rules in school', 'single-sex schools', 'uniforms', 'funding', 'educational aid to poorer countries'] },
      { name: 'Environment', subtopics: ['animals', 'protection of endangered species', 'zoos', 'environmental problems', 'saving the environment & solving problems', 'government vs individual roles'] },
      { name: 'Family & Children', subtopics: ['family roles', 'family size', 'the generation gap', 'discipline', 'role models', 'family and education'] },
      { name: 'Food', subtopics: ['healthy diets', 'education of diet', 'traditional vs modern diets', 'fast food', 'children and diet'] },
      { name: 'Health', subtopics: ['prevention vs cure', 'funding', 'health and education', 'poor countries and rich countries', 'health aid', 'dealing with global epidemics', 'hospitals and treatment', 'obesity', 'exercise and health'] },
      { name: 'Language', subtopics: ['having only one language in the world', 'methods of language learning', 'travel and language', 'disappearance of languages', 'language and culture'] },
      { name: 'Media & Advertising', subtopics: ['censorship, control and freedom of speech', 'advertising methods', 'children and advertising', 'media and technology', 'news & reporting'] },
      { name: 'Space Exploration', subtopics: ['space exploration funding', 'benefits of space exploration', 'private vs government space programs', 'future of space travel'] },
      { name: 'Technology', subtopics: ['controlling the internet', 'socialising online', 'children and technology (safety)', 'change in society', 'letter vs email', 'storing data', 'safety of personal information', 'hacking'] },
      { name: 'Transport', subtopics: ['development of infrastructure', 'comparing forms of transport', 'problems with modern forms of transport', 'environmental issues'] },
      { name: 'Travel', subtopics: ['culture and travel', 'understanding people and travel', 'living in a global world'] },
      { name: 'Society', subtopics: ['overpopulation', 'poverty', 'homeless people', 'crime on the streets', 'modern life styles', 'budget spending', 'public services'] },
      { name: 'Sport', subtopics: ['professionals vs amateurs', 'salary', 'equipment', 'sport and learning', 'sport as a school subject', 'men vs women in sport', 'types of sport'] },
      { name: 'Work', subtopics: ['shift work', 'women in work', 'types of jobs (blue collar / white collar)', 'children and exploitation', 'part time work', 'work and technology', 'employment', 'salary', 'equality'] }
    ],

    advice: 'You should practice developing ideas for all common essay topics used by IELTS so that you can write your essay within the given time limit.'
  };

  // ========== CONTENT DATA ==========
  const readingContent = {
    description: 'Master the Academic and General Training Reading tests with effective strategies. Learn how to tackle all 14 different question types with confidence.',
    
    testInfo: {
      title: 'IELTS Reading Test Information',
      points: [
        'The IELTS Reading test has 3 sections and 40 questions.',
        'You have 60 minutes to complete the test.',
        'The Academic Reading test has 3 long passages.',
        'The General Training Reading test has 5 passages.',
        'There are 14 different question types you need to master.',
        'Each correct answer is worth 1 mark.',
        'Your final score is converted to a band score from 0-9.',
        'No extra time is given for transferring answers.'
      ]
    },

    questionTypes: [
      'True / False / Not Given', 'Multiple Choice', 'Matching Headings',
      'Matching Information', 'Matching Features', 'Summary Completion',
      'Sentence Completion', 'Table Completion', 'Flow Chart Completion',
      'Diagram Label Completion', 'Short Answer Questions',
      'Matching Sentence Endings', 'Identifying Information',
      'Identifying Writer\'s Views/Claims'
    ],

    sections: [
      { name: 'Academic Reading', description: '3 long passages from journals, books, magazines' },
      { name: 'General Training Reading', description: '5 passages of increasing difficulty' }
    ],

    challenges: [
      'Time management (60 minutes for 40 questions)',
      'Complex vocabulary and unfamiliar topics',
      'Identifying paraphrasing and synonyms',
      'Understanding True/False/Not Given distinctions',
      'Matching headings to paragraphs quickly'
    ],

    practiceLessons: [
      { title: 'TRUE/FALSE/NOT GIVEN - Exercise 1: The Thames Tunnel', type: 'True/False/Not Given', hasModal: true, modalContent: tfngExercise1 },
      { title: 'TRUE/FALSE/NOT GIVEN - Exercise 2: Pyramid Building', type: 'True/False/Not Given', hasModal: true, modalContent: tfngExercise2 },
      { title: 'TRUE/FALSE/NOT GIVEN - Exercise 3: Beethoven', type: 'True/False/Not Given', hasModal: true, modalContent: tfngExercise3 },
      { title: 'TRUE/FALSE/NOT GIVEN - Exercise 4: Spam Messaging', type: 'True/False/Not Given', hasModal: true, modalContent: tfngExercise4 },
      { title: 'MATCHING HEADINGS - Exercise 1: The Greenhouse Effect', type: 'Matching Headings', hasModal: true, modalContent: matchingHeadingsContent },
      { title: 'MATCHING HEADINGS - Exercise 2: The History of Pasta', type: 'Matching Headings', hasModal: true, modalContent: matchingHeadingsContent },
      { title: 'MULTIPLE CHOICE - Practice 1: All About Rice', type: 'Multiple Choice', hasModal: true, modalContent: multipleChoiceReadingContent },
      { title: 'MULTIPLE CHOICE - Practice 2: GM Foods', type: 'Multiple Choice', hasModal: true, modalContent: multipleChoiceReadingContent },
      { title: 'YES/NO/NOT GIVEN - Richard, the Lionheart', type: 'Yes/No/Not Given', hasModal: true, modalContent: ynngContent },
      { title: 'SENTENCE COMPLETION - Practice 1: Neighbourhood Badgers', type: 'Sentence Completion', hasModal: true, modalContent: sentenceCompletionReadingContent },
      { title: 'SENTENCE COMPLETION - Practice 2: Water Pollution', type: 'Sentence Completion', hasModal: true, modalContent: sentenceCompletionReadingContent },
      { title: 'SUMMARY COMPLETION - Practice: Fermented Foods', type: 'Summary Completion', hasModal: true, modalContent: summaryCompletionReadingContent },
      { title: 'SHORT ANSWER QUESTIONS - The History of Painted Eggs', type: 'Short Answer', hasModal: true, modalContent: shortAnswerContent }
    ],

    tips: [
      'Skim the passage first to get an overview',
      'Read the questions carefully before reading in detail',
      'Don\'t read the whole passage in depth first',
      'Use keywords to locate answers quickly',
      'Watch for synonyms and paraphrasing - answers are rarely word-for-word',
      'Manage your time - aim for 20 minutes per passage',
      'For True/False/Not Given, look for exact contradictions',
      'Check your spelling carefully',
      'If you can\'t find the answer, move on and come back later',
      'Leave time to transfer answers (paper-based test)'
    ],

    tfngInfo: {
      title: 'What are True, False, Not Given Questions?',
      description: 'These are questions where you are required to decide whether the information in the question statement is true, false or not given based on what you read in the passage.',
      trueDefinition: 'A TRUE answer is one where the question statement matches the passage information.',
      falseDefinition: 'A FALSE answer is one where the question statement doesn\'t match the information because it is incorrect or gives an opposite meaning.',
      notGivenDefinition: 'A NOT GIVEN answer is one where there isn\'t enough information in the passage to decide if the statement is correct or not.'
    }
  };

  // ========== CONTENT DATA ==========
  const contentData = {
    listening: {
      description: 'IELTS listening practice with essential tips and techniques to maximise your score. You must do more than simply practice IELTS listening, you must analyse your answers, develop awareness of question types and also build techniques.',
      testInfo: {
        title: 'IELTS Listening Test Information',
        points: [
          'There is only one listening test for all IELTS candidates.',
          'The IELTS listening test lasts for a total of 40 mins. The recording lasts for 30 mins.',
          'Paper-based test: You have 10 mins to transfer answers.',
          'Computer-based test: You have 2 mins to check your answers.',
          'There are 40 questions with one point for each correct answer.',
          'You can only listen to the recording once.',
          'You will hear a variety of accents.',
          'The listening test is about multi-tasking – listen, read questions, and write answers simultaneously.'
        ]
      },
      questionTypes: [
        'Sentence Completion', 'Summary Completion', 'Form Completion', 'Note Completion',
        'Multiple Choice', 'Short Answer Questions', 'Table Completion', 'Diagram Labelling',
        'Map/Plan Completion', 'Flow Chart Completion'
      ],
      sections: [
        { name: 'Section 1 & 2', description: 'Based on social situations' },
        { name: 'Section 3 & 4', description: 'Based on education/training and lectures' }
      ],
      challenges: [
        'Concentration', 'Losing your place in the recording', 'Writing the wrong number of words for your answer',
        'Not spotting paraphrases', 'Getting distracted by detail'
      ],
      practiceLessons: [
        { title: 'MULTIPLE CHOICE PRACTICE WITH TIPS', type: 'Multiple Choice', hasModal: true, modalContent: multipleChoiceContent },
        { title: 'MAP QUESTIONS PRACTICE WITH TIPS', type: 'Map/Plan' },
        { title: 'DIAGRAM QUESTIONS PRACTICE WITH TIPS', type: 'Diagram', hasModal: true, modalContent: diagramQuestionsContent },
        { title: 'SECTION 4 PRACTICE WITH TIPS', type: 'Section 4' },
        { title: 'SUMMARY COMPLETION PRACTICE WITH TIPS', type: 'Summary', hasModal: true, modalContent: summaryCompletionContent },
        { title: 'TABLE COMPLETION PRACTICE WITH TIPS', type: 'Table' },
        { title: 'SENTENCE COMPLETION PRACTICE WITH TIPS', type: 'Sentence', hasModal: true, modalContent: sentenceCompletionContent },
        { title: 'SHORT ANSWER QUESTIONS PRACTICE WITH TIPS', type: 'Short Answer' },
        { title: 'NUMBERS PRACTICE', type: 'Numbers', hasModal: true, modalContent: numbersPracticeContent },
        { title: 'LISTENING FOR ADDRESSES', type: 'Addresses' },
        { title: 'LISTENING FOR CITY NAMES', type: 'City Names', hasModal: true, modalContent: cityNamesContent },
        { title: 'LISTENING FOR LETTERS: ALPHABET PRACTICE', type: 'Alphabet' },
        { title: 'SPELLING FOR NAMES', type: 'Spelling', hasModal: true, modalContent: namesPracticeContent },
        { title: 'BIG NUMBERS PRACTICE', type: 'Numbers' }
      ],
      tips: [
        'Read questions before each section starts',
        'Underline keywords in questions',
        'Watch for paraphrasing – answers are rarely word-for-word',
        'Write answers on the question paper first, then transfer',
        'Check spelling and grammar during transfer time',
        'Pay attention to word limits (e.g., "no more than two words")',
        'Stay focused – you only hear the recording once'
      ]
    },
    reading: readingContent,
    writing: {
      description: 'Excel in both Academic and General Training Writing tasks. Master Task 1 reports and Task 2 essays with proven strategies and model answers.',
      
      features: [
        'Task 1 Academic: Report writing (charts, graphs, diagrams, maps)',
        'Task 1 General Training: Letter writing',
        'Task 2 Essay writing for both tests',
        'Marking criteria explained for band scores 5-8',
        'Band score descriptors for 7, 8, 9',
        'Paraphrasing techniques for higher vocabulary scores',
        'Common essay topics with subtopics',
        'When to give your opinion in essays',
        'Essay planning strategies',
        'Model answers with examiner comments'
      ],

      practiceLessons: [
        { title: 'WRITING TASK 1 ACADEMIC - Overview & Tips', type: 'Task 1 Academic', hasModal: true, modalContent: writingTask1Content },
        { title: 'WRITING TASK 1 - MAP MODEL ANSWER', type: 'Task 1 Map', hasModal: true, modalContent: writingTask1Content.mapModelAnswer },
        { title: 'WRITING TASK 2 - ESSAY TIPS & STRATEGIES', type: 'Task 2', hasModal: true, modalContent: writingTask2Content },
        { title: 'PARAPHRASING - Essential Techniques', type: 'Vocabulary', hasModal: true, modalContent: paraphrasingContent },
        { title: 'COMMON ESSAY TOPICS - 20 Topics with Subtopics', type: 'Topics', hasModal: true, modalContent: commonTopicsContent },
        { title: 'WHEN TO GIVE YOUR OPINION - Essay Instructions Guide', type: 'Task 2', hasModal: true, modalContent: writingTask2Content },
        { title: 'ESSAY PLANNING - How to Plan Your Essay', type: 'Task 2', hasModal: true, modalContent: writingTask2Content }
      ],

      tips: [
        'Analyse the task before writing',
        'Plan your essay structure (5-10 minutes)',
        'Use paragraphing effectively',
        'Proofread for errors before finishing',
        'Write a clear overview in Task 1',
        'Use a range of linking devices',
        'Paraphrase the question in your introduction',
        'Support your arguments with examples',
        'Maintain a clear position throughout your essay',
        'Check your spelling and grammar carefully',
        'Write between 170-190 words for Task 1',
        'Write between 270-290 words for Task 2'
      ],

      markingCriteria: {
        title: 'IELTS Writing Marking Criteria',
        criteria: [
          { name: 'Task Achievement (Task 1) / Task Response (Task 2)', percentage: '25%', description: 'Completing the task and answering the question fully' },
          { name: 'Coherence and Cohesion', percentage: '25%', description: 'Organisation, paragraphing, and linking of ideas' },
          { name: 'Lexical Resource (Vocabulary)', percentage: '25%', description: 'Range and accuracy of vocabulary used' },
          { name: 'Grammatical Range and Accuracy', percentage: '25%', description: 'Range and accuracy of sentence structures and grammar' }
        ]
      }
    },
    speaking: {
      description: 'Achieve fluency and confidence in the face-to-face Speaking test.',
      features: [
        'Part 1: Introduction & Interview (4-5 mins)',
        'Part 2: Individual Long Turn (3-4 mins)',
        'Part 3: Two-way Discussion (4-5 mins)',
        'Fluency and coherence strategies',
        'Lexical resource development'
      ],
      tips: [
        'Extend your answers naturally',
        'Use a range of vocabulary',
        'Practice speaking for 2 minutes without stopping',
        'Record yourself to identify areas for improvement'
      ]
    },
    vocabulary: {
      description: 'Expand your lexical resource for higher band scores.',
      features: [
        'Topic-specific vocabulary lists',
        'Academic word list',
        'Idiomatic language for Speaking',
        'Collocations and word families',
        'Paraphrasing techniques'
      ],
      tips: [
        'Learn words in context',
        'Use new vocabulary in speaking and writing',
        'Keep a vocabulary notebook',
        'Review words regularly'
      ]
    },
    topics: {
      description: 'Master common IELTS topics and themes.',
      features: [
        'Common IELTS topics analyzed',
        'Topic-specific vocabulary',
        'Model answers for popular topics',
        'Recent exam questions database'
      ],
      tips: [
        'Prepare ideas for common topics',
        'Learn topic-specific vocabulary',
        'Practice writing essays on various topics',
        'Stay updated with current events'
      ]
    },
    ontheday: {
      description: 'Essential tips for the day of your IELTS exam.',
      features: [
        'What to bring on test day',
        'Arrival and registration process',
        'Time management strategies',
        'Handling test day anxiety',
        'Final preparation checklist'
      ],
      tips: [
        'Get a good night\'s sleep',
        'Eat a healthy breakfast',
        'Arrive at least 30 minutes early',
        'Bring your passport/ID',
        'Stay calm and confident'
      ]
    },
    topresults: {
      description: 'Learn from successful IELTS candidates who achieved band 7, 8, and 9.',
      features: [
        'Success stories from band 9 achievers',
        'Study strategies that worked',
        'Common mistakes to avoid',
        'Resources recommended by top scorers'
      ],
      tips: [
        'Set realistic goals',
        'Practice consistently every day',
        'Learn from your mistakes',
        'Get feedback from qualified teachers'
      ]
    },
    advanced: {
      description: 'Advanced strategies for candidates targeting band 8 and 9.',
      features: [
        'Advanced grammar structures',
        'Sophisticated vocabulary usage',
        'Complex sentence construction',
        'Critical thinking for essays',
        'Nuanced speaking techniques'
      ],
      tips: [
        'Read academic articles daily',
        'Listen to podcasts and lectures',
        'Practice with higher-level materials',
        'Focus on precision and accuracy'
      ]
    }
  };

  const activeContent = contentData[activeTab] || contentData.listening;
  const activeCategory = categories.find(c => c.id === activeTab) || categories[0];

  const handleLessonClick = (lesson) => {
    if (lesson.hasModal && lesson.modalContent) {
      openModal(lesson.modalContent);
    } else {
      window.open('https://wa.me/2347061066372', '_blank');
    }
  };

  // Collapsible Section Component
  const CollapsibleSection = ({ title, content, isOpen, onToggle, icon }) => {
    return (
      <div className="bg-dark-100/50 rounded-lg overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg">
        <button
          onClick={onToggle}
          className="w-full px-4 py-3 flex items-center justify-between bg-primary-500/10 hover:bg-primary-500/20 transition-all duration-300 group"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg transition-transform duration-300 group-hover:scale-125">{icon}</span>
            <span className="text-white font-bold text-base md:text-lg transition-all duration-300 group-hover:text-primary-400 group-hover:tracking-wide">{title}</span>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-400 transition-transform duration-300 group-hover:text-primary-400"
          >
            ▼
          </motion.span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4">
                {typeof content === 'string' ? (
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">{content}</p>
                ) : Array.isArray(content) ? (
                  <div className="space-y-2">
                    {content.map((item, idx) => (
                      <p key={idx} className="text-gray-300 text-sm md:text-base">{item}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-300 text-sm md:text-base">{content}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Audio Player Component
  const AudioPlayer = ({ practiceId, audioUrl, isPlaying, onToggle }) => {
    if (!audioUrl) return null;
    
    return (
      <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-lg p-4 mb-4 transition-all duration-300 hover:shadow-lg hover:border-primary-500/30 border border-transparent">
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={onToggle}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
          >
            {isPlaying ? (
              <>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="white" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" fill="white" />
                  <rect x="14" y="4" width="4" height="16" fill="white" />
                </svg>
                <span className="text-white font-bold text-sm md:text-base">Pause Recording</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="white" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="text-white font-bold text-sm md:text-base">Play Recording</span>
              </>
            )}
          </button>
          <div className="text-sm text-gray-300">
            <span className="font-bold text-base">🎧 IELTS Listening Practice</span>
            <p className="text-xs text-gray-400 mt-1">Listen carefully and write down the names</p>
          </div>
        </div>
        <audio
          ref={el => audioRefs.current[practiceId] = el}
          src={audioUrl}
          onEnded={() => handleAudioEnded(practiceId)}
          className="hidden"
        />
      </div>
    );
  };

  // Comment Section Component
  const CommentSection = () => {
    const categoryComments = comments[activeTab] || [];
    
    const [localName, setLocalName] = useState('');
    const [localEmail, setLocalEmail] = useState('');
    const [localWebsite, setLocalWebsite] = useState('');
    const [localComment, setLocalComment] = useState('');
    const [localNotifyFollowup, setLocalNotifyFollowup] = useState(false);
    const [localNotifyPosts, setLocalNotifyPosts] = useState(false);
    const [submittingLocal, setSubmittingLocal] = useState(false);

    const handleLocalSubmit = async (e) => {
      e.preventDefault();
      if (!localName || !localEmail || !localComment) {
        alert('Please fill in all required fields');
        return;
      }
      setSubmittingLocal(true);
      
      const newComment = {
        id: Date.now(),
        name: localName,
        email: localEmail,
        website: localWebsite,
        comment: localComment,
        date: new Date().toLocaleString(),
        notifyFollowup: localNotifyFollowup,
        notifyPosts: localNotifyPosts
      };
      
      setTimeout(() => {
        setComments(prev => ({
          ...prev,
          [activeTab]: [...(prev[activeTab] || []), newComment]
        }));
        setLocalName('');
        setLocalEmail('');
        setLocalWebsite('');
        setLocalComment('');
        setLocalNotifyFollowup(false);
        setLocalNotifyPosts(false);
        setSubmittingLocal(false);
        alert('Comment posted successfully!');
      }, 500);
    };

    return (
      <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 mt-8">
        <h3 className="text-xl md:text-2xl font-extrabold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">💬</span> Speak Your Mind
        </h3>
        
        {categoryComments.length > 0 && (
          <div className="mb-6 space-y-4">
            <h4 className="text-lg font-bold text-primary-400">Comments ({categoryComments.length})</h4>
            {categoryComments.map((comment) => (
              <div key={comment.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-bold text-primary-400">{comment.name}</span>
                    <span className="text-gray-500 text-sm ml-2">said:</span>
                  </div>
                  <span className="text-gray-500 text-xs">{comment.date}</span>
                </div>
                <p className="text-gray-300">{comment.comment}</p>
                {comment.website && (
                  <p className="text-gray-500 text-xs mt-2">Website: {comment.website}</p>
                )}
              </div>
            ))}
          </div>
        )}
        
        <form onSubmit={handleLocalSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2 font-bold">Name *</label>
              <input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="Enter your name"
                required
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2 font-bold">Email *</label>
              <input
                type="email"
                value={localEmail}
                onChange={(e) => setLocalEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="Enter your email"
                required
                autoComplete="off"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2 font-bold">Website</label>
            <input
              type="url"
              value={localWebsite}
              onChange={(e) => setLocalWebsite(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
              placeholder="Your website (optional)"
              autoComplete="off"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2 font-bold">Comment *</label>
            <textarea
              value={localComment}
              onChange={(e) => setLocalComment(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
              placeholder="Share your thoughts, questions, or feedback..."
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localNotifyFollowup}
                onChange={(e) => setLocalNotifyFollowup(e.target.checked)}
                className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
              />
              <span className="text-gray-400 text-sm">Notify me of follow-up comments by email.</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localNotifyPosts}
                onChange={(e) => setLocalNotifyPosts(e.target.checked)}
                className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
              />
              <span className="text-gray-400 text-sm">Notify me of new posts by email.</span>
            </label>
          </div>
          
          <button
            type="submit"
            disabled={submittingLocal}
            className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white font-extrabold hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50"
          >
            {submittingLocal ? 'Posting...' : 'POST COMMENT'}
          </button>
        </form>
      </div>
    );
  };

  // ========== MAIN RENDER ==========
  return (
    <div className="min-h-screen bg-dark-100 py-20 px-4 relative overflow-hidden">
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            IELTS Preparation
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-bold">
            Free IELTS lessons, tips, and model answers to help you achieve your target band score.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-5 py-2 rounded-full transition-all duration-300 text-sm md:text-base font-bold ${
                activeTab === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white hover:shadow-md'
              }`}
            >
              {category.title}
            </button>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Section Header */}
          <div className={`bg-gradient-to-r ${activeCategory.color}/20 rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:shadow-xl`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl transition-transform duration-300 hover:scale-125">{activeCategory.icon}</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">{activeCategory.title}</h2>
            </div>
            <p className="text-gray-300 text-base md:text-lg font-bold">{activeContent.description}</p>
          </div>

          {/* Listening specific sections */}
          {activeTab === 'listening' && (
            <>
              {/* Test Information */}
              {activeContent.testInfo && (
                <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
                  <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">📋</span> {activeContent.testInfo.title}
                  </h3>
                  <ul className="space-y-2">
                    {activeContent.testInfo.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-base md:text-lg font-medium">
                        <span className="text-primary-500 mt-0.5 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Question Types */}
              {activeContent.questionTypes && (
                <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
                  <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">❓</span> IELTS Listening Question Types
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeContent.questionTypes.map((type, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-primary-500/20 text-primary-300 rounded-full text-sm md:text-base font-bold transition-all duration-300 hover:bg-primary-500/40 hover:scale-105 hover:shadow-md">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sections */}
              {activeContent.sections && (
                <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
                  <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">📑</span> Sections of the IELTS Listening Test
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeContent.sections.map((section, idx) => (
                      <div key={idx} className="bg-white/5 rounded-lg p-3 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                        <p className="text-white font-bold text-base md:text-lg">{section.name}</p>
                        <p className="text-gray-400 text-sm md:text-base font-medium">{section.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Challenges */}
              {activeContent.challenges && (
                <div className="bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/20 transition-all duration-300 hover:shadow-xl hover:border-yellow-500/40">
                  <h3 className="text-xl md:text-2xl font-extrabold text-yellow-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">⚠️</span> Biggest Challenges
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeContent.challenges.map((challenge, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-yellow-500/20 text-yellow-300 rounded-full text-sm md:text-base font-bold transition-all duration-300 hover:bg-yellow-500/40 hover:scale-105 hover:shadow-md">
                        {challenge}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Practice Lessons */}
              {activeContent.practiceLessons && (
                <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
                  <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">🎧</span> IELTS Listening Practice Lessons
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeContent.practiceLessons.map((lesson, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLessonClick(lesson)}
                        className="text-left px-4 py-3 bg-white/5 rounded-lg hover:bg-primary-500/20 transition-all duration-300 group"
                      >
                        <p className="text-white text-sm md:text-base font-bold group-hover:text-primary-400 group-hover:text-lg transition-all duration-300">{lesson.title}</p>
                        <p className="text-gray-500 text-xs font-medium">{lesson.type}</p>
                      </button>
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs mt-4 italic font-medium">
                    Click any lesson to access comprehensive practice materials and expert tips.
                  </p>
                </div>
              )}

              {/* Instructions */}
              <div className="bg-primary-500/10 rounded-xl p-6 border border-primary-500/20 transition-all duration-300 hover:shadow-xl hover:border-primary-500/40">
                <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                  <span className="text-2xl transition-transform duration-300 hover:scale-125">📝</span> IELTS Listening Test Instructions
                </h3>
                <p className="text-gray-300 text-base md:text-lg mb-3 font-bold">
                  With each set of questions, you will be given instructions about the answer.
                </p>
                <div className="bg-white/5 rounded-lg p-4 mt-3 transition-all duration-300 hover:bg-white/10">
                  <p className="text-white font-extrabold text-base md:text-lg mb-2">No more than three words and/or numbers</p>
                  <ul className="text-gray-400 text-sm md:text-base space-y-1">
                    <li className="font-bold">• one word (with numbers or without)</li>
                    <li className="font-bold">• two words (with numbers or without)</li>
                    <li className="font-bold">• three words (with numbers or not)</li>
                    <li className="text-red-400 font-extrabold">• You cannot write four or more words</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {/* Reading specific sections */}
          {activeTab === 'reading' && (
            <>
              {/* Test Information */}
              {activeContent.testInfo && (
                <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
                  <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">📋</span> {activeContent.testInfo.title}
                  </h3>
                  <ul className="space-y-2">
                    {activeContent.testInfo.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-base md:text-lg font-medium">
                        <span className="text-primary-500 mt-0.5 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Question Types */}
              {activeContent.questionTypes && (
                <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
                  <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">❓</span> IELTS Reading Question Types
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeContent.questionTypes.map((type, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-primary-500/20 text-primary-300 rounded-full text-sm md:text-base font-bold transition-all duration-300 hover:bg-primary-500/40 hover:scale-105 hover:shadow-md">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* TFNG Information */}
              {activeContent.tfngInfo && (
                <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20 transition-all duration-300 hover:shadow-xl hover:border-blue-500/40">
                  <h3 className="text-xl md:text-2xl font-extrabold text-blue-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">📖</span> {activeContent.tfngInfo.title}
                  </h3>
                  <p className="text-gray-300 text-base md:text-lg mb-4 font-bold">{activeContent.tfngInfo.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                      <p className="text-green-400 font-extrabold text-sm">TRUE</p>
                      <p className="text-gray-400 text-xs mt-1">{activeContent.tfngInfo.trueDefinition}</p>
                    </div>
                    <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                      <p className="text-red-400 font-extrabold text-sm">FALSE</p>
                      <p className="text-gray-400 text-xs mt-1">{activeContent.tfngInfo.falseDefinition}</p>
                    </div>
                    <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                      <p className="text-yellow-400 font-extrabold text-sm">NOT GIVEN</p>
                      <p className="text-gray-400 text-xs mt-1">{activeContent.tfngInfo.notGivenDefinition}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Practice Lessons */}
              {activeContent.practiceLessons && (
                <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
                  <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">📚</span> IELTS Reading Practice Lessons
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeContent.practiceLessons.map((lesson, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLessonClick(lesson)}
                        className="text-left px-4 py-3 bg-white/5 rounded-lg hover:bg-primary-500/20 transition-all duration-300 group"
                      >
                        <p className="text-white text-sm md:text-base font-bold group-hover:text-primary-400 group-hover:text-lg transition-all duration-300">{lesson.title}</p>
                        <p className="text-gray-500 text-xs font-medium">{lesson.type}</p>
                      </button>
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs mt-4 italic font-medium">
                    Click any lesson to access comprehensive practice materials and expert tips.
                  </p>
                </div>
              )}

              {/* Reading Tips */}
              <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20 transition-all duration-300 hover:shadow-xl hover:border-green-500/40">
                <h3 className="text-xl md:text-2xl font-extrabold text-green-400 mb-4 flex items-center gap-2">
                  <span className="text-2xl transition-transform duration-300 hover:scale-125">💡</span> Essential Reading Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {activeContent.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2 transition-all duration-300 hover:translate-x-2">
                      <span className="text-green-500 mt-0.5 font-bold text-lg">✓</span>
                      <span className="text-gray-300 text-sm md:text-base font-bold">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Writing specific sections */}
          {activeTab === 'writing' && (
            <>
              {/* Test Information */}
              {activeContent.testInfo && (
                <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
                  <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">📋</span> {activeContent.testInfo.title}
                  </h3>
                  <ul className="space-y-2">
                    {activeContent.testInfo.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-base md:text-lg font-medium">
                        <span className="text-primary-500 mt-0.5 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Marking Criteria */}
              {activeContent.markingCriteria && (
                <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
                  <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">🎯</span> {activeContent.markingCriteria.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeContent.markingCriteria.criteria.map((criterion, idx) => (
                      <div key={idx} className="bg-white/5 rounded-lg p-3 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                        <p className="text-white font-bold text-sm md:text-base">{criterion.name}</p>
                        <p className="text-primary-400 text-xs font-bold">{criterion.percentage}</p>
                        <p className="text-gray-400 text-xs mt-1">{criterion.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {activeContent.features && (
                <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
                  <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">📋</span> Key Features & Strategies
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeContent.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 transition-all duration-300 hover:translate-x-2">
                        <span className="text-primary-500 mt-0.5 font-bold text-lg">→</span>
                        <span className="text-gray-300 text-sm md:text-base font-bold">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practice Lessons */}
              {activeContent.practiceLessons && (
                <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
                  <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">✏️</span> IELTS Writing Practice Lessons
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeContent.practiceLessons.map((lesson, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLessonClick(lesson)}
                        className="text-left px-4 py-3 bg-white/5 rounded-lg hover:bg-primary-500/20 transition-all duration-300 group"
                      >
                        <p className="text-white text-sm md:text-base font-bold group-hover:text-primary-400 group-hover:text-lg transition-all duration-300">{lesson.title}</p>
                        <p className="text-gray-500 text-xs font-medium">{lesson.type}</p>
                      </button>
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs mt-4 italic font-medium">
                    Click any lesson to access comprehensive practice materials and expert tips.
                  </p>
                </div>
              )}

              {/* Writing Tips */}
              <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20 transition-all duration-300 hover:shadow-xl hover:border-green-500/40">
                <h3 className="text-xl md:text-2xl font-extrabold text-green-400 mb-4 flex items-center gap-2">
                  <span className="text-2xl transition-transform duration-300 hover:scale-125">💡</span> Essential Writing Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {activeContent.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2 transition-all duration-300 hover:translate-x-2">
                      <span className="text-green-500 mt-0.5 font-bold text-lg">✓</span>
                      <span className="text-gray-300 text-sm md:text-base font-bold">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Other tabs (speaking, vocabulary, topics, etc.) */}
          {activeTab !== 'listening' && activeTab !== 'reading' && activeTab !== 'writing' && activeContent.features && (
            <div className="bg-dark-100/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl">
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-4 flex items-center gap-2">
                <span className="text-primary-500 text-2xl transition-transform duration-300 hover:scale-125">📋</span> Key Features & Strategies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeContent.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 transition-all duration-300 hover:translate-x-2">
                    <span className="text-primary-500 mt-0.5 font-bold text-lg">→</span>
                    <span className="text-gray-300 text-sm md:text-base font-bold">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips Section for non-listening/reading/writing tabs */}
          {activeTab !== 'listening' && activeTab !== 'reading' && activeTab !== 'writing' && (
            <div className="bg-primary-500/10 rounded-xl p-6 border border-primary-500/20 transition-all duration-300 hover:shadow-xl hover:border-primary-500/40">
              <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-4 flex items-center gap-2">
                <span className="text-2xl transition-transform duration-300 hover:scale-125">💡</span> Essential Tips for Success
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeContent.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 transition-all duration-300 hover:translate-x-2">
                    <span className="text-green-500 mt-0.5 font-bold text-lg">✓</span>
                    <span className="text-gray-300 text-sm md:text-base font-bold">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Free Resources Banner */}
          <div className="bg-gradient-to-r from-primary-600/10 to-secondary-600/10 rounded-xl p-5 border border-white/10 transition-all duration-300 hover:shadow-xl hover:border-primary-500/30">
            <h3 className="font-extrabold text-white mb-2 flex items-center gap-2 text-xl md:text-2xl">
              <span className="text-2xl transition-transform duration-300 hover:scale-125">📚</span> Free IELTS Resources
            </h3>
            <p className="text-gray-400 text-sm md:text-base font-bold">
              Access hundreds of free IELTS practice lessons, model answers, test tips, and topic-based vocabulary.
            </p>
            <div className="flex gap-3 mt-4">
              <Link to="/register" className="px-4 py-2 bg-primary-600 rounded-lg text-white text-sm md:text-base font-extrabold hover:bg-primary-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Start Preparation
              </Link>
              <button onClick={() => window.open('https://wa.me/2347061066372', '_blank')} className="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg text-sm md:text-base font-extrabold hover:bg-green-600/30 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2">
                💬 Ask a Question
              </button>
            </div>
          </div>

          {/* Success Quote */}
          <div className="text-center py-4">
            <p className="text-gray-400 italic text-base md:text-lg font-bold">
              "Success is within your grasp! Develop your skills & techniques with strategic IELTS preparation."
            </p>
            <p className="text-primary-400 mt-2 font-extrabold text-base md:text-lg">- Good luck from JEO Digital Team</p>
          </div>

          {/* Comment Section */}
          <CommentSection />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 text-center bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:shadow-2xl hover:border-primary-500/50"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Ready to Achieve Your Target Band Score?</h2>
          <p className="text-gray-400 mb-6 text-base md:text-lg font-bold">Join our comprehensive IELTS preparation program today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white font-extrabold text-base md:text-lg hover:opacity-90 transition-all duration-300 hover:scale-110 hover:shadow-xl">
              Enroll Now
            </Link>
            <button onClick={() => window.open('https://wa.me/2347061066372', '_blank')} className="px-6 py-3 bg-green-600/20 text-green-400 rounded-lg font-extrabold text-base md:text-lg hover:bg-green-600/30 transition-all duration-300 hover:scale-110 hover:shadow-xl flex items-center gap-2">
              💬 Contact for Consultation
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && modalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-100 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-primary-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 p-6 border-b border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">{modalData.title}</h2>
                    <p className="text-gray-400 text-sm mt-1">{modalData.description}</p>
                  </div>
                  <button onClick={closeModal} className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {modalData.passage && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">📄</span> Reading Passage
                    </h3>
                    <div className="bg-white/5 rounded-lg p-4 max-h-60 overflow-y-auto">
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">{modalData.passage}</p>
                    </div>
                  </div>
                )}

                {modalData.tips && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">💡</span> Essential Tips
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {modalData.tips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2 transition-all duration-300 hover:translate-x-2">
                          <span className="text-primary-500 mt-0.5 font-bold text-lg">•</span>
                          <span className="text-gray-300 text-sm md:text-base font-bold">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {modalData.headingOptions && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">📌</span> Heading Options
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {modalData.headingOptions.map((heading, idx) => (
                        <div key={idx} className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2">
                          <span className="text-primary-500 font-bold text-sm">{heading.split('.')[0]}</span>
                          <span className="text-gray-300 text-sm md:text-base font-bold">{heading}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {modalData.questionTypes && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">❓</span> Question Types
                    </h3>
                    <div className="space-y-2">
                      {modalData.questionTypes.map((type, idx) => (
                        <p key={idx} className="text-gray-300 text-sm md:text-base font-bold">{type}</p>
                      ))}
                    </div>
                  </div>
                )}

                {modalData.taskTypes && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">📊</span> Task Types
                    </h3>
                    <div className="space-y-2">
                      {modalData.taskTypes.map((type, idx) => (
                        <div key={idx} className="bg-white/5 rounded-lg p-3 transition-all duration-300 hover:bg-white/10">
                          <p className="text-white font-bold text-sm md:text-base">{type.name}</p>
                          <p className="text-gray-400 text-xs md:text-sm">{type.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {modalData.markingCriteria && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">🎯</span> Marking Criteria
                    </h3>
                    <div className="space-y-2">
                      {modalData.markingCriteria.map((criteria, idx) => (
                        <div key={idx} className="bg-white/5 rounded-lg p-3 transition-all duration-300 hover:bg-white/10">
                          <p className="text-white font-bold text-sm md:text-base">{criteria.name}</p>
                          <p className="text-gray-400 text-xs md:text-sm">{criteria.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {modalData.essayTypes && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">📝</span> Essay Types
                    </h3>
                    <div className="space-y-2">
                      {modalData.essayTypes.map((type, idx) => (
                        <div key={idx} className="bg-white/5 rounded-lg p-3 transition-all duration-300 hover:bg-white/10">
                          <p className="text-white font-bold text-sm md:text-base">{type.name}</p>
                          <p className="text-gray-400 text-xs md:text-sm">{type.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {modalData.whenToGiveOpinion && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">💡</span> {modalData.whenToGiveOpinion.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base mb-3">{modalData.whenToGiveOpinion.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                        <p className="text-green-400 font-extrabold text-sm">Requires Opinion</p>
                        <ul className="text-gray-400 text-xs space-y-1 mt-2">
                          {modalData.whenToGiveOpinion.requiresOpinion.map((item, idx) => (
                            <li key={idx} className="font-bold">• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                        <p className="text-yellow-400 font-extrabold text-sm">No Opinion Needed</p>
                        <ul className="text-gray-400 text-xs space-y-1 mt-2">
                          {modalData.whenToGiveOpinion.doesNotRequireOpinion.map((item, idx) => (
                            <li key={idx} className="font-bold">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {modalData.topics && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">📚</span> Common Essay Topics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {modalData.topics.map((topic, idx) => (
                        <div key={idx} className="bg-white/5 rounded-lg p-3 transition-all duration-300 hover:bg-white/10">
                          <p className="text-white font-bold text-sm">{topic.name}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {topic.subtopics.map((sub, subIdx) => (
                              <span key={subIdx} className="text-gray-400 text-xs bg-white/5 px-2 py-0.5 rounded-full">{sub}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {modalData.advice && (
                      <p className="text-gray-400 text-xs mt-3 italic font-bold">{modalData.advice}</p>
                    )}
                  </div>
                )}

                {modalData.planningTips && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">📋</span> {modalData.planningTips.title}
                    </h3>
                    <ul className="space-y-1">
                      {modalData.planningTips.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm md:text-base font-bold">
                          <span className="text-primary-500 mt-0.5 font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {modalData.modelAnswer && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">📝</span> Model Answer
                    </h3>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">{modalData.modelAnswer}</p>
                    </div>
                  </div>
                )}

                {modalData.modelAnswerComments && (
                  <CollapsibleSection
                    title="Model Answer Comments"
                    content={modalData.modelAnswerComments}
                    isOpen={expandedSections[`comments`]}
                    onToggle={() => toggleSection('comments', 'comments')}
                    icon="💬"
                  />
                )}

                {modalData.examples && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">📖</span> Paraphrasing Examples
                    </h3>
                    <div className="space-y-3">
                      {modalData.examples.map((example, idx) => (
                        <div key={idx} className="bg-white/5 rounded-lg p-3 transition-all duration-300 hover:bg-white/10">
                          <p className="text-gray-300 text-sm font-bold">Original: <span className="font-normal text-gray-400">{example.original}</span></p>
                          <p className="text-green-400 text-sm font-bold mt-1">Paraphrased: <span className="font-normal text-green-300">{example.paraphrased}</span></p>
                          <p className="text-gray-500 text-xs mt-1">Changes: {example.changes}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {modalData.bandScoreRequirements && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">🎯</span> Band Score Requirements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {modalData.bandScoreRequirements.vocabularyRange && (
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-white font-bold text-sm">Vocabulary Range</p>
                          <div className="space-y-1 mt-2">
                            {Object.entries(modalData.bandScoreRequirements.vocabularyRange).map(([band, desc]) => (
                              <p key={band} className="text-gray-400 text-xs">Band {band}: {desc}</p>
                            ))}
                          </div>
                        </div>
                      )}
                      {modalData.bandScoreRequirements.numberOfErrors && (
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-white font-bold text-sm">Number of Errors</p>
                          <div className="space-y-1 mt-2">
                            {Object.entries(modalData.bandScoreRequirements.numberOfErrors).map(([band, desc]) => (
                              <p key={band} className="text-gray-400 text-xs">Band {band}: {desc}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {modalData.practice && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">✏️</span> Practice Suggestions
                    </h3>
                    <ul className="space-y-1">
                      {modalData.practice.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm md:text-base font-bold">
                          <span className="text-primary-500 mt-0.5 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {modalData.questions && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">❓</span> Questions
                    </h3>
                    <div className="space-y-2">
                      {modalData.questions.map((q, idx) => (
                        <p key={idx} className="text-gray-300 text-sm md:text-base font-bold">{q}</p>
                      ))}
                    </div>
                  </div>
                )}

                {modalData.summaryText && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">📝</span> Summary
                    </h3>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">{modalData.summaryText}</p>
                    </div>
                  </div>
                )}

                {modalData.wordList && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-primary-400 mb-3 flex items-center gap-2">
                      <span className="text-2xl transition-transform duration-300 hover:scale-125">📋</span> Word List
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {modalData.wordList.map((word, idx) => (
                        <div key={idx} className="bg-white/5 rounded-lg p-2 text-center transition-all duration-300 hover:bg-white/10">
                          <span className="text-gray-300 text-sm font-bold">{word}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {modalData.vocabulary && (
                  <CollapsibleSection
                    title="Vocabulary"
                    content={Array.isArray(modalData.vocabulary) ? modalData.vocabulary : [modalData.vocabulary]}
                    isOpen={expandedSections[`vocabulary`]}
                    onToggle={() => toggleSection('vocabulary', 'vocabulary')}
                    icon="📚"
                  />
                )}

                {modalData.extraInfo && (
                  <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                    <p className="text-yellow-300 text-sm md:text-base font-bold">{modalData.extraInfo}</p>
                  </div>
                )}

                {modalData.answers && (
                  <CollapsibleSection
                    title="Answers"
                    content={Array.isArray(modalData.answers) ? modalData.answers : [modalData.answers]}
                    isOpen={expandedSections[`answers`]}
                    onToggle={() => toggleSection('answers', 'answers')}
                    icon="✅"
                  />
                )}

                {modalData.answerExplanations && (
                  <CollapsibleSection
                    title="Answer Explanations"
                    content={Array.isArray(modalData.answerExplanations) ? modalData.answerExplanations : [modalData.answerExplanations]}
                    isOpen={expandedSections[`explanations`]}
                    onToggle={() => toggleSection('explanations', 'explanations')}
                    icon="📖"
                  />
                )}

                {modalData.practices && modalData.practices.map((practice, idx) => (
                  <div key={idx} className="bg-white/5 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:shadow-lg">
                    <h4 className="text-white font-extrabold text-lg md:text-xl mb-2">{practice.title}</h4>
                    <p className="text-gray-400 text-sm md:text-base mb-3 font-bold">{practice.topic}</p>
                    
                    {practice.audioUrl && (
                      <AudioPlayer
                        practiceId={practice.id}
                        audioUrl={practice.audioUrl}
                        isPlaying={audioStates[practice.id]}
                        onToggle={() => toggleAudio(practice.id)}
                      />
                    )}
                    
                    {practice.imageUrl && (
                      <div className="mb-4 transition-all duration-300 hover:scale-105">
                        <img src={practice.imageUrl} alt={practice.topic} className="rounded-lg max-w-full h-auto border border-white/20" />
                      </div>
                    )}
                    
                    {practice.questions && (
                      <div className="mb-3">
                        <p className="text-gray-300 text-sm md:text-base font-extrabold mb-2">Questions:</p>
                        <div className="space-y-1">
                          {practice.questions.map((q, qIdx) => (
                            <p key={qIdx} className="text-gray-400 text-sm md:text-base font-bold">{q}</p>
                          ))}
                        </div>
                      </div>
                    )}

                    {practice.transcript && (
                      <CollapsibleSection
                        title="Recording Transcript"
                        content={practice.transcript}
                        isOpen={expandedSections[`${practice.id}-transcript`]}
                        onToggle={() => toggleSection(practice.id, 'transcript')}
                        icon="📝"
                      />
                    )}

                    {practice.answers && (
                      <CollapsibleSection
                        title="Answers"
                        content={Array.isArray(practice.answers) ? practice.answers : [practice.answers]}
                        isOpen={expandedSections[`${practice.id}-answers`]}
                        onToggle={() => toggleSection(practice.id, 'answers')}
                        icon="✅"
                      />
                    )}

                    {practice.answerExplanation && (
                      <CollapsibleSection
                        title="Answer Explanation"
                        content={practice.answerExplanation}
                        isOpen={expandedSections[`${practice.id}-explanation`]}
                        onToggle={() => toggleSection(practice.id, 'explanation')}
                        icon="📖"
                      />
                    )}

                    {practice.vocabulary && (
                      <CollapsibleSection
                        title="Vocabulary"
                        content={practice.vocabulary}
                        isOpen={expandedSections[`${practice.id}-vocabulary`]}
                        onToggle={() => toggleSection(practice.id, 'vocabulary')}
                        icon="📚"
                      />
                    )}
                  </div>
                ))}

                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button onClick={closeModal} className="flex-1 px-4 py-2 bg-primary-600 rounded-lg text-white font-extrabold hover:bg-primary-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Close
                  </button>
                  <button onClick={() => window.open('https://wa.me/2347061066372', '_blank')} className="flex-1 px-4 py-2 bg-green-600/20 text-green-400 rounded-lg font-extrabold hover:bg-green-600/30 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2">
                    💬 Need Help?
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IELTS;