import React, { useState, useMemo, useEffect } from 'react';
import { Search, Cloud, Brain } from 'lucide-react';
import { glossaryData } from './data/glossaryData';
import { CloudServiceBadge } from './components/CloudServiceBadge';
import { MermaidDiagram } from './components/MermaidDiagram';
import { useLocation } from 'react-router-dom';

const categories = [
  { id: 'all', name: 'All Terms', colorClass: 'bg-nexi-4' },
  { id: 'fundamentals', name: 'Fundamentals', colorClass: 'bg-nexi-1' },
  { id: 'learning-types', name: 'Learning Types', colorClass: 'bg-nexi-5' },
  { id: 'applications', name: 'Applications', colorClass: 'bg-nexi-6' },
  { id: 'advanced', name: 'Advanced', colorClass: 'bg-nexi-4' },
  { id: 'challenges', name: 'Challenges', colorClass: 'bg-nexi-3' }
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const location = useLocation();
console.log('App component rendered');
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

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    const category = categories.find(cat => cat.id === hash);
    if (category) {
      setSelectedCategory(category.id);
    } else {
      setSelectedCategory('all');
    }
  }, [location]);

  const filteredGlossary = useMemo(() => {
    return glossaryData.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700 font-sans">
      <header className="glossary-header bg-gradient-to-r from-nexi-1 to-nexi-3 shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">
            AI Glossary
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-nexi-7">
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 mb-6">
          <input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-nexi-4 focus:ring-2 focus:ring-nexi-4/10 transition-all "
          />
        
        <div className="flex flex-wrap gap-4 my-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-1 px-2 py-1 rounded-lg font-semibold transition-all flex items-center justify-center space-x-1
                ${selectedCategory === category.id 
                  ? `bg-nexi-4 text-white border-1 border-nexi-4` 
                  : 'bg-nexi-8 text-gray-700 hover:bg-gray-200 border-1 border-transparent'
                }`}
            >
              <span>{category.name}</span>
            </button>
          ))}
        </div>
        </div>
        <div className="grid gap-6 animate-fadeIn">
          {filteredGlossary.length > 0 ? (
            filteredGlossary.map(item => {
              const IconComponent = item.icon;
              return (
                <article key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 ">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg flex-shrink-0 bg-nexi-2">
                        <IconComponent className="h-6 w-6 text-nexi-1" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2 text-nexi-1">
                          {item.term}
                        </h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {item.definition}
                        </p>
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold mb-2 text-nexi-3">
                            Key Points:
                          </h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {item.keyPoints.map((point, index) => (
                              <li key={index}>{point}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold mb-2 text-nexi-3">
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
                        <MermaidDiagram 
                          diagram={item.diagram} 
                          title={`${item.term} Flow Diagram`}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No terms found
              </h2>
              <p className="text-gray-700 mb-4">
                Try adjusting your search or selecting a different category.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-lg bg-nexi-1 text-white font-semibold shadow-md hover:bg-indigo-700 transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-gradient-to-r from-nexi-3 to-nexi-1 py-8 text-nexi-7">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm">
                &copy; 2023 AI Glossary. All rights reserved.
              </p>
            </div>
      </footer>
    </div>
  );
};

export default App;
