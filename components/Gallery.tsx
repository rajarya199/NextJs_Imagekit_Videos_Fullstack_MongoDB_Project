import React from 'react';
import { Play, Heart, Share2, Eye } from 'lucide-react';
import Image from 'next/image';

const videos = [
  {
    id: 1,
    title: 'Sunset Timelapse',
    duration: '2:30',
    views: '12.5K',
    likes: '892',
    thumbnail: 'https://images.pexels.com/photos/1694000/pexels-photo-1694000.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    title: 'Urban Motion',
    duration: '1:45',
    views: '8.2K',
    likes: '634',
    thumbnail: 'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    title: 'Nature Documentary',
    duration: '5:12',
    views: '25.1K',
    likes: '1.8K',
    thumbnail: 'https://images.pexels.com/photos/1426044/pexels-photo-1426044.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    title: 'Creative Process',
    duration: '3:28',
    views: '15.7K',
    likes: '1.2K',
    thumbnail: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    title: 'Street Photography',
    duration: '4:05',
    views: '19.3K',
    likes: '1.5K',
    thumbnail: 'https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    title: 'Food Preparation',
    duration: '2:18',
    views: '9.8K',
    likes: '756',
    thumbnail: 'https://images.pexels.com/photos/3026800/pexels-photo-3026800.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export default function Gallery() {
  return (
    <section className="py-20  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Featured
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Video Gallery</span>
          </h2>
          <p className="text-lg dark:text-gray-400 text-gray-600">
            Discover amazing content created by our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group bg-white  dark:bg-primary-500 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-white hover:scale-110">
                    <Play className="w-6 h-6 text-gray-800 ml-1" />
                  </button>
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 transition-colors">
                  {video.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm dark:text-gray-400 text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{video.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{video.likes}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100  dark:hover:bg-gray-700 rounded-full transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 font-medium">
            View All Videos
          </button>
        </div>
      </div>
    </section>
  );
}