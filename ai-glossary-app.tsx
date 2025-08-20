import React, { useState, useMemo, useEffect } from 'react';
import { Search, Cloud, Cpu, Brain, Database, TrendingUp, Eye, MessageCircle, BarChart3, Shield, RefreshCw, AlertTriangle, Layers, Network, FileText, Zap } from 'lucide-react';

const AIGlossaryApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load Mermaid on component mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    script.onload = () => {
      window.mermaid?.initialize({ 
        startOnLoad: true, 
        theme: 'neutral',
        themeVariables: {
          primaryColor: '#08437D',
          primaryTextColor: '#070E27',
          primaryBorderColor: '#127ACF',
          lineColor: '#4E82A2'
        }
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const glossaryData = [
    {
      id: 'artificial-intelligence',
      term: 'Artificial Intelligence (AI)',
      category: 'fundamentals',
      definition: 'A technology that enables machines to perform tasks that typically require human intelligence, such as pattern recognition, decision-making, and problem-solving.',
      keyPoints: [
        'Automates repetitive and monotonous tasks',
        'Finds patterns in data and forecasts trends',
        'Helps businesses make smarter decisions'
      ],
      cloudServices: {
        aws: ['Amazon Bedrock', 'Amazon SageMaker', 'Amazon Comprehend'],
        gcp: ['Vertex AI', 'AutoML', 'AI Platform'],
        azure: ['Azure Machine Learning', 'Cognitive Services', 'Azure AI']
      },
      icon: Brain,
      diagram: `graph TD
    A[Data Input] --> B[AI Processing]
    B --> C[Pattern Recognition]
    B --> D[Decision Making]
    C --> E[Insights & Predictions]
    D --> E
    E --> F[Automated Actions]`
    },
    {
  id: 'llm',
  term: 'Large Language Model -LLM-',
  category: 'advanced',
  definition: 'A type of foundation model trained on massive text datasets, capable of understanding and generating human-like language.',
  keyPoints: [
    'Built using transformer architectures',
    'Capable of zero-shot and few-shot learning',
    'Used in chatbots, summarization, code generation, and more'
  ],
  cloudServices: {
    aws: ['Amazon Bedrock with Jurassic-2', 'Anthropic Claude on Bedrock'],
    gcp: ['PaLM API', 'Vertex AI Generative AI'],
    azure: ['Azure OpenAI Service with GPT models']
  },
  icon: Book,
  diagram: `graph TD
    A[Massive Text Dataset] --> B[Transformer-based Training]
    B --> C[Large Language Model]
    C --> D[Text Understanding]
    C --> E[Text Generation]
    D --> F[Applications like QnA]
    E --> G[Applications like Summarization]`
},
{
  id: 'foundation-model',
  term: 'Foundation Model',
  category: 'advanced',
  definition: 'Large-scale pre-trained AI models trained on broad data that can be adapted to a wide variety of downstream tasks.',
  keyPoints: [
    'Trained on massive datasets across modalities',
    'Serve as a base for specialized fine-tuned models',
    'Examples include GPT, PaLM, CLIP, DALL-E'
  ],
  cloudServices: {
    aws: ['Amazon Titan', 'Amazon Bedrock'],
    gcp: ['PaLM API', 'Vertex AI Foundation Models'],
    azure: ['Azure OpenAI Service', 'Azure Cognitive Services']
  },
  icon: Layers,
  diagram: `graph TB
    A[Massive Diverse Data] --> B[Foundation Model]
    B --> C[Language Tasks]
    B --> D[Vision Tasks]
    B --> E[Multimodal Tasks]
    C --> F[Domain Adaptation]
    D --> F
    E --> F`
},
{
  id: 'transformer',
  term: 'Transformer',
  category: 'fundamentals',
  definition: 'A deep learning architecture that uses self-attention mechanisms to process input data in parallel, enabling breakthroughs in NLP and beyond.',
  keyPoints: [
    'Processes entire input sequences in parallel',
    'Uses self-attention to capture relationships',
    'Foundation of models like BERT, GPT, T5'
  ],
  cloudServices: {
    aws: ['Amazon SageMaker with HuggingFace Transformers'],
    gcp: ['Vertex AI with TensorFlow and JAX Transformers'],
    azure: ['Azure ML with HuggingFace Transformers']
  },
  icon: GitBranch,
  diagram: `graph LR
    A[Input Sequence] --> B[Embedding Layer]
    B --> C[Self-Attention Mechanism]
    C --> D[Feed Forward Network]
    D --> E[Output Representation]
    F[Multi-Head Attention] -.-> C`
},
    {
      id: 'machine-learning',
      term: 'Machine Learning (ML)',
      category: 'fundamentals',
      definition: 'A branch of AI that focuses on building systems that learn from data to make predictions or decisions without explicit programming for each task.',
      keyPoints: [
        'Uses algorithms to identify patterns in historical data',
        'Improves accuracy through training on datasets',
        'Makes predictions on new, unseen data through inference'
      ],
      cloudServices: {
        aws: ['Amazon SageMaker', 'Amazon ML', 'AWS DeepLens'],
        gcp: ['Vertex AI', 'BigQuery ML', 'TensorFlow on GCP'],
        azure: ['Azure Machine Learning', 'Azure Cognitive Services', 'Azure Databricks']
      },
      icon: Cpu,
      diagram: `graph LR
    A[Training Data] --> B[ML Algorithm]
    B --> C[Model Training]
    C --> D[Trained Model]
    D --> E[New Data Input]
    E --> F[Inference/Prediction]`
    },
    {
      id: 'deep-learning',
      term: 'Deep Learning',
      category: 'advanced',
      definition: 'A type of machine learning that uses neural networks with multiple layers to process information, inspired by the structure of the human brain.',
      keyPoints: [
        'Uses layers of artificial neurons (nodes)',
        'Excels at image classification and natural language processing',
        'Can identify complex relationships in unstructured data'
      ],
      cloudServices: {
        aws: ['Amazon SageMaker', 'AWS Deep Learning AMIs', 'Amazon EC2 P4 instances'],
        gcp: ['Vertex AI', 'Deep Learning VM Image', 'TPUs'],
        azure: ['Azure Machine Learning', 'Azure Batch AI', 'Data Science Virtual Machines']
      },
      icon: Layers,
      diagram: `graph TB
    A[Input Layer] --> B[Hidden Layer 1]
    B --> C[Hidden Layer 2]
    C --> D[Hidden Layer 3]
    D --> E[Output Layer]
    F[Weights & Biases] -.-> B
    F -.-> C
    F -.-> D`
    },
    {
      id: 'supervised-learning',
      term: 'Supervised Learning',
      category: 'learning-types',
      definition: 'A machine learning approach where models are trained on labeled data, with both input features and expected outputs provided.',
      keyPoints: [
        'Requires pre-labeled training data',
        'Used for classification and regression tasks',
        'Model learns to map inputs to correct outputs'
      ],
      cloudServices: {
        aws: ['Amazon SageMaker Ground Truth', 'Amazon Comprehend', 'Amazon Rekognition'],
        gcp: ['Vertex AI', 'AutoML Tables', 'Vision AI'],
        azure: ['Azure Machine Learning', 'Custom Vision', 'Form Recognizer']
      },
      icon: FileText,
      diagram: `graph LR
    A[Labeled Training Data] --> B[Supervised Learning Algorithm]
    B --> C[Trained Model]
    D[New Input] --> C
    C --> E[Predicted Output]`
    },
    {
      id: 'unsupervised-learning',
      term: 'Unsupervised Learning',
      category: 'learning-types',
      definition: 'A machine learning approach that finds patterns in data without labeled examples, used for clustering and anomaly detection.',
      keyPoints: [
        'Works with unlabeled data',
        'Identifies hidden patterns and structures',
        'Common for clustering and anomaly detection'
      ],
      cloudServices: {
        aws: ['Amazon SageMaker', 'Amazon Kinesis Analytics', 'Amazon DevOps Guru'],
        gcp: ['Vertex AI', 'BigQuery ML', 'Dataflow'],
        azure: ['Azure Machine Learning', 'Azure Stream Analytics', 'Azure Anomaly Detector']
      },
      icon: Search,
      diagram: `graph TD
    A[Unlabeled Data] --> B[Clustering Algorithm]
    A --> C[Anomaly Detection]
    B --> D[Data Groups/Clusters]
    C --> E[Outliers/Anomalies]`
    },
    {
      id: 'reinforcement-learning',
      term: 'Reinforcement Learning',
      category: 'learning-types',
      definition: 'A machine learning method where an agent learns through trial and error by receiving rewards or penalties for actions taken in an environment.',
      keyPoints: [
        'Agent learns through interaction with environment',
        'Uses reward and penalty system',
        'Focused on autonomous decision making'
      ],
      cloudServices: {
        aws: ['AWS DeepRacer', 'Amazon SageMaker RL', 'AWS RoboMaker'],
        gcp: ['Vertex AI', 'AI Platform', 'Deep Learning VM'],
        azure: ['Azure Machine Learning', 'Microsoft Autonomous Systems', 'Azure Cognitive Services']
      },
      icon: RefreshCw,
      diagram: `graph LR
    A[Agent] --> B[Action]
    B --> C[Environment]
    C --> D[State/Reward]
    D --> A
    E[Goal Achievement] -.-> D`
    },
    {
      id: 'natural-language-processing',
      term: 'Natural Language Processing (NLP)',
      category: 'applications',
      definition: 'AI technology that enables machines to understand, interpret, and generate human language in a natural-sounding way.',
      keyPoints: [
        'Powers chatbots and voice assistants',
        'Enables real-time language translation',
        'Processes and analyzes text data'
      ],
      cloudServices: {
        aws: ['Amazon Comprehend', 'Amazon Translate', 'Amazon Lex'],
        gcp: ['Natural Language AI', 'Translation API', 'Dialogflow'],
        azure: ['Language Understanding', 'Translator', 'Speech Services']
      },
      icon: MessageCircle,
      diagram: `graph TB
    A[Human Language Input] --> B[Tokenization]
    B --> C[Linguistic Analysis]
    C --> D[Semantic Understanding]
    D --> E[Response Generation]
    E --> F[Natural Language Output]`
    },
    {
      id: 'computer-vision',
      term: 'Computer Vision',
      category: 'applications',
      definition: 'AI applications that process images and video for object identification, facial recognition, classification, and monitoring.',
      keyPoints: [
        'Identifies objects and faces in images/video',
        'Used for quality control and monitoring',
        'Enables automated visual inspection'
      ],
      cloudServices: {
        aws: ['Amazon Rekognition', 'Amazon Lookout for Vision', 'AWS Panorama'],
        gcp: ['Vision AI', 'Video Intelligence API', 'AutoML Vision'],
        azure: ['Computer Vision', 'Face API', 'Custom Vision']
      },
      icon: Eye,
      diagram: `graph LR
    A[Image/Video Input] --> B[Feature Extraction]
    B --> C[Pattern Recognition]
    C --> D[Object Detection]
    C --> E[Classification]
    D --> F[Visual Analysis Results]
    E --> F`
    },
    {
      id: 'generative-ai',
      term: 'Generative AI',
      category: 'advanced',
      definition: 'Advanced AI that can create original content like text, images, videos, and music by learning patterns from large datasets.',
      keyPoints: [
        'Uses transformer neural networks',
        'Processes prompts to generate responses',
        'Can create stories, code, images, and more'
      ],
      cloudServices: {
        aws: ['Amazon Bedrock', 'Amazon CodeWhisperer', 'Amazon Titan'],
        gcp: ['Vertex AI Generative AI', 'Bard API', 'PaLM API'],
        azure: ['Azure OpenAI Service', 'Azure Cognitive Services', 'GitHub Copilot']
      },
      icon: Zap,
      diagram: `graph TB
    A[Large Training Dataset] --> B[Transformer Network]
    B --> C[Pre-trained Model]
    D[User Prompt] --> C
    C --> E[Generated Content]
    E --> F[Text/Images/Code/Music]`
    },
    {
      id: 'bias',
      term: 'Bias',
      category: 'challenges',
      definition: 'Disparities in model performance across different groups, where results are skewed in favor of or against particular outcomes.',
      keyPoints: [
        'Results from unrepresentative training data',
        'Can lead to unfair discrimination',
        'Requires diverse datasets and fairness constraints'
      ],
      cloudServices: {
        aws: ['Amazon SageMaker Clarify', 'AWS AI Fairness', 'Amazon A2I'],
        gcp: ['What-If Tool', 'AI Explanations', 'Vertex AI Model Monitoring'],
        azure: ['Fairlearn', 'Azure Machine Learning Responsible AI', 'InterpretML']
      },
      icon: Shield,
      diagram: `graph TD
    A[Biased Training Data] --> B[Model Training]
    B --> C[Biased Model]
    C --> D[Unfair Outcomes]
    E[Diverse Data] --> F[Fairness Constraints]
    F --> G[Fair Model]
    G --> H[Equitable Results]`
    },
    {
      id: 'overfitting',
      term: 'Overfitting',
      category: 'challenges',
      definition: 'When a model performs well on training data but poorly on new data because it has learned the training data too specifically.',
      keyPoints: [
        'Model fits training data too closely',
        'Poor performance on unseen data',
        'Solved with more diverse training data'
      ],
      cloudServices: {
        aws: ['Amazon SageMaker Debugger', 'Amazon SageMaker Experiments', 'AWS Model Monitor'],
        gcp: ['Vertex AI Model Monitoring', 'TensorBoard', 'Vertex Experiments'],
        azure: ['Azure ML Model Interpretability', 'Azure ML Monitoring', 'MLflow']
      },
      icon: AlertTriangle,
      diagram: `graph LR
    A[Training Data] --> B[Model]
    B --> C{Performance Check}
    C -->|Good| D[Training Data Results]
    C -->|Poor| E[New Data Results]
    E --> F[Overfitting Detected]
    F --> G[Add Diverse Data]
    G --> B`
    },
    {
    id: 'neural-network',
    term: 'Neural Network',
    category: 'fundamentals',
    definition: 'A computational model inspired by the human brain, consisting of interconnected nodes (neurons) organized into layers for processing data.',
    keyPoints: [
      'Made of input, hidden, and output layers',
      'Learns weights and biases through training',
      'Basis for deep learning models'
    ],
    cloudServices: {
      aws: ['Amazon SageMaker', 'AWS Deep Learning AMIs', 'Amazon EC2 G5'],
      gcp: ['Vertex AI', 'TPUs', 'Deep Learning Containers'],
      azure: ['Azure Machine Learning', 'Azure Cognitive Services', 'Azure AI Supercomputing']
    },
    icon: Network,
    diagram: `graph TD
    A[Input Layer] --> B[Hidden Layer]
    B --> C[Hidden Layer]
    C --> D[Output Layer]
    E[Weights & Biases] -.-> B
    E -.-> C`
  },
  {
    id: 'transfer-learning',
    term: 'Transfer Learning',
    category: 'advanced',
    definition: 'A technique where a pre-trained model is reused on a new task, leveraging prior knowledge to improve learning efficiency.',
    keyPoints: [
      'Reduces training time and resource usage',
      'Improves performance with limited data',
      'Widely used in NLP and computer vision'
    ],
    cloudServices: {
      aws: ['Amazon SageMaker JumpStart', 'AWS Transfer Learning SDK'],
      gcp: ['TensorFlow Hub', 'Vertex AI Model Garden'],
      azure: ['Azure ML Model Catalog', 'Azure Custom Vision Transfer Learning']
    },
    icon: Repeat,
    diagram: `graph LR
    A[Pre-trained Model] --> B[Feature Extraction]
    B --> C[Fine-tuning on New Data]
    C --> D[New Task Performance]`
  },
  {
    id: 'foundation-model',
    term: 'Foundation Model',
    category: 'advanced',
    definition: 'Large-scale pre-trained models that serve as a base for a wide range of downstream AI tasks through fine-tuning.',
    keyPoints: [
      'Trained on massive datasets',
      'Can be adapted for multiple domains',
      'Examples include GPT, BERT, CLIP'
    ],
    cloudServices: {
      aws: ['Amazon Titan', 'Amazon Bedrock'],
      gcp: ['PaLM API', 'Vertex AI Foundation Models'],
      azure: ['Azure OpenAI Service', 'Azure Cognitive Services']
    },
    icon: BookOpen,
    diagram: `graph TB
    A[Large Dataset] --> B[Foundation Model]
    B --> C[Text Tasks]
    B --> D[Vision Tasks]
    B --> E[Multimodal Tasks]`
  },
  {
    id: 'explainable-ai',
    term: 'Explainable AI -XAI-',
    category: 'challenges',
    definition: 'Techniques and methods that make AI model decisions transparent and understandable to humans.',
    keyPoints: [
      'Builds trust in AI decisions',
      'Helps debug and improve models',
      'Critical for regulated industries like healthcare and finance'
    ],
    cloudServices: {
      aws: ['Amazon SageMaker Clarify'],
      gcp: ['Explainable AI', 'What-If Tool'],
      azure: ['InterpretML', 'Responsible AI Dashboard']
    },
    icon: Info,
    diagram: `graph TD
    A[AI Model] --> B[Prediction]
    B --> C[Explainability Layer]
    C --> D[Human Understanding]
    E[Transparency] --> C`
  },
  {
    id: 'hallucination',
    term: 'Hallucination',
    category: 'challenges',
    definition: 'When a generative AI model produces outputs that are factually incorrect, nonsensical, or fabricated.',
    keyPoints: [
      'Common in large language models',
      'Caused by pattern completion without factual grounding',
      'Can be mitigated using retrieval augmented generation'
    ],
    cloudServices: {
      aws: ['Amazon Bedrock RAG integrations'],
      gcp: ['Vertex AI Grounding with Search'],
      azure: ['Azure OpenAI On Your Data']
    },
    icon: AlertCircle,
    diagram: `graph LR
    A[Prompt] --> B[Generative Model]
    B --> C[Fabricated Answer]
    D[Fact Database] -.-> B
    E[RAG Integration] --> B`
  },
  {
    id: 'rag',
    term: 'Retrieval Augmented Generation -RAG-',
    category: 'advanced',
    definition: 'An AI architecture that combines retrieval of relevant information from external sources with generative models to produce factually accurate outputs.',
    keyPoints: [
      'Improves accuracy of responses',
      'Combines search with generation',
      'Reduces hallucination issues'
    ],
    cloudServices: {
      aws: ['Amazon Kendra with Bedrock'],
      gcp: ['Vertex AI Search + Generative AI'],
      azure: ['Azure Cognitive Search with OpenAI']
    },
    icon: Database,
    diagram: `graph TD
    A[User Query] --> B[Retriever]
    B --> C[Relevant Documents]
    C --> D[Generative Model]
    D --> E[Grounded Response]`
  },
  {
    id: 'multimodal-ai',
    term: 'Multimodal AI',
    category: 'advanced',
    definition: 'AI systems that process and integrate multiple types of data inputs, such as text, images, audio, and video.',
    keyPoints: [
      'Enables richer contextual understanding',
      'Powers models like GPT-4 and CLIP',
      'Used in autonomous vehicles and robotics'
    ],
    cloudServices: {
      aws: ['Amazon Rekognition + Bedrock'],
      gcp: ['PaLM Multimodal', 'Vertex AI Multimodal'],
      azure: ['Azure OpenAI Multimodal', 'Azure Media Services']
    },
    icon: Image,
    diagram: `graph TB
    A[Text Input] --> D[Multimodal Model]
    B[Image Input] --> D
    C[Audio Input] --> D
    D --> E[Unified Understanding]
    E --> F[Context-Aware Response]`
  },
  {
    id: 'vector-embedding',
    term: 'Vector Embedding',
    category: 'fundamentals',
    definition: 'A numerical representation of data such as text or images in a high-dimensional space, used for similarity search and machine learning tasks.',
    keyPoints: [
      'Encodes semantic meaning into vectors',
      'Allows efficient similarity search',
      'Essential for retrieval augmented generation'
    ],
    cloudServices: {
      aws: ['Amazon Kendra', 'Amazon OpenSearch Service'],
      gcp: ['Vertex AI Matching Engine'],
      azure: ['Azure Cognitive Search Vector Index']
    },
    icon: Grid,
    diagram: `graph LR
    A[Text/Image] --> B[Embedding Model]
    B --> C[Vector Representation]
    C --> D[Similarity Search Engine]
    D --> E[Relevant Matches]`
  },
    {
      id: 'inference',
      term: 'Inference',
      category: 'fundamentals',
      definition: 'The process of using a trained model to make predictions or generate outputs from new input data.',
      keyPoints: [
        'Produces probabilistic results (educated guesses)',
        'Can be performed in real-time or batch mode',
        'The practical application of trained models'
      ],
      cloudServices: {
        aws: ['Amazon SageMaker Endpoints', 'AWS Lambda', 'Amazon EC2'],
        gcp: ['Vertex AI Endpoints', 'Cloud Run', 'Cloud Functions'],
        azure: ['Azure ML Endpoints', 'Azure Container Instances', 'Azure Functions']
      },
      icon: TrendingUp,
      diagram: `graph LR
    A[New Input Data] --> B[Trained Model]
    B --> C[Processing]
    C --> D[Prediction/Output]
    D --> E[Confidence Score]`
    }
  ];

  const categories = [
    { id: 'all', name: 'All Terms', color: 'var(--www-nexi-bot-color-4)' },
    { id: 'fundamentals', name: 'Fundamentals', color: 'var(--www-nexi-bot-color-1)' },
    { id: 'learning-types', name: 'Learning Types', color: 'var(--www-nexi-bot-color-5)' },
    { id: 'applications', name: 'Applications', color: 'var(--www-nexi-bot-color-6)' },
    { id: 'advanced', name: 'Advanced', color: 'var(--www-nexi-bot-color-4)' },
    { id: 'challenges', name: 'Challenges', color: 'var(--www-nexi-bot-color-3)' }
  ];

  const filteredGlossary = useMemo(() => {
    return glossaryData.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const CloudServiceBadge = ({ service, provider }) => {
    const colors = {
      aws: '#FF9900',
      gcp: '#4285F4',
      azure: '#0078D4'
    };

    return (
      <span 
        className="inline-block px-2 py-1 text-xs rounded-full text-white mr-2 mb-1"
        style={{ backgroundColor: colors[provider] }}
      >
        {service}
      </span>
    );
  };

  const MermaidDiagram = ({ diagram, title }) => {
    const [copied, setCopied] = useState(false);
    const [isRendered, setIsRendered] = useState(false);
    const diagramId = `mermaid-${title.replace(/\s+/g, '-').toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(diagram);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    };

    useEffect(() => {
      if (window.mermaid && !isRendered) {
        const element = document.getElementById(diagramId);
        if (element) {
          try {
            window.mermaid.render(`diagram-${diagramId}`, diagram)
              .then(({ svg }) => {
                element.innerHTML = svg;
                setIsRendered(true);
              })
              .catch((error) => {
                console.error('Mermaid rendering error:', error);
                element.innerHTML = `<div class="text-red-500 text-sm p-2">Diagram rendering failed</div>`;
              });
          } catch (error) {
            console.error('Mermaid error:', error);
          }
        }
      }
    }, [diagram, diagramId, isRendered]);

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
          <button
            onClick={copyToClipboard}
            className={`px-3 py-1 text-xs rounded-md transition-colors flex items-center space-x-1 ${
              copied 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            <FileText className="h-3 w-3" />
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
        
        {/* Rendered Mermaid Diagram */}
        <div className="mb-4 p-4 bg-white rounded border min-h-[200px] flex items-center justify-center">
          <div id={diagramId} className="w-full text-center">
            <div className="text-gray-500 animate-pulse">Loading diagram...</div>
          </div>
        </div>
        
        {/* Copyable Code Block */}
        <details className="mt-2">
          <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
            View Mermaid Code
          </summary>
          <div className="mt-2 relative">
            <div className="text-sm font-mono text-gray-600 whitespace-pre-line bg-white p-3 rounded border overflow-x-auto max-h-32 overflow-y-auto">
              {diagram}
            </div>
          </div>
        </details>
        <p className="text-xs text-gray-500 mt-2">
          📋 Click "Copy Code" to copy Mermaid syntax • 🎨 Diagram renders automatically above
        </p>
      </div>
    );
  };

  return (
    <div style={{
      '--www-nexi-bot-color-1': '#08437D',
      '--www-nexi-bot-color-2': '#B7C5CE',
      '--www-nexi-bot-color-3': '#070E27',
      '--www-nexi-bot-color-4': '#127ACF',
      '--www-nexi-bot-color-5': '#31B3DC',
      '--www-nexi-bot-color-6': '#4E82A2'
    }} className="min-h-screen bg-gray-50">
      {/* SEO Meta Information */}
      <div className="sr-only">
        <h1>AI Glossary - Comprehensive Artificial Intelligence Terms Dictionary</h1>
        <p>Complete glossary of AI, Machine Learning, and Deep Learning terms with cloud service providers (AWS, Google Cloud, Azure) and practical applications.</p>
        <div>Keywords: artificial intelligence, machine learning, deep learning, AI glossary, AWS AI services, Google Cloud AI, Azure AI, NLP, computer vision, supervised learning, unsupervised learning</div>
      </div>

      {/* Header */}
      <header className="shadow-lg" style={{ backgroundColor: 'var(--www-nexi-bot-color-1)' }}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-white" />
            <div>
              <h1 className="text-3xl font-bold text-white">AI Glossary</h1>
              <p className="text-gray-200">Comprehensive Dictionary of Artificial Intelligence Terms</p>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search AI terms..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: 'var(--www-nexi-bot-color-4)' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id 
                      ? 'text-white' 
                      : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category.id ? category.color : undefined
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredGlossary.length} of {glossaryData.length} terms
          </p>
        </div>

        {/* Glossary Terms */}
        <div className="grid gap-6">
          {filteredGlossary.map(item => {
            const IconComponent = item.icon;
            return (
              <article key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div 
                      className="p-3 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: 'var(--www-nexi-bot-color-2)' }}
                    >
                      <IconComponent className="h-6 w-6" style={{ color: 'var(--www-nexi-bot-color-1)' }} />
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--www-nexi-bot-color-1)' }}>
                        {item.term}
                      </h2>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {item.definition}
                      </p>

                      {/* Key Points */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--www-nexi-bot-color-3)' }}>
                          Key Points:
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {item.keyPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Cloud Services */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--www-nexi-bot-color-3)' }}>
                          Cloud Services:
                        </h3>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-600 mb-1">
                              <Cloud className="inline h-4 w-4 mr-1" />
                              Amazon Web Services (AWS):
                            </h4>
                            <div>
                              {item.cloudServices.aws.map(service => (
                                <CloudServiceBadge key={service} service={service} provider="aws" />
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-gray-600 mb-1">
                              <Cloud className="inline h-4 w-4 mr-1" />
                              Google Cloud Platform:
                            </h4>
                            <div>
                              {item.cloudServices.gcp.map(service => (
                                <CloudServiceBadge key={service} service={service} provider="gcp" />
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-gray-600 mb-1">
                              <Cloud className="inline h-4 w-4 mr-1" />
                              Microsoft Azure:
                            </h4>
                            <div>
                              {item.cloudServices.azure.map(service => (
                                <CloudServiceBadge key={service} service={service} provider="azure" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mermaid Diagram */}
                      <MermaidDiagram 
                        diagram={item.diagram} 
                        title={`${item.term} Flow Diagram`}
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredGlossary.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No terms found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 py-8" style={{ backgroundColor: 'var(--www-nexi-bot-color-3)' }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-300">
            AI Glossary - Your comprehensive guide to artificial intelligence terminology and cloud services
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Stay updated with the latest AI developments and cloud platform offerings
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AIGlossaryApp;