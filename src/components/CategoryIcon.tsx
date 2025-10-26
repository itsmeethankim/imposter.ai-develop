import { Category } from '../App';
import animeIcon from 'figma:asset/6e7315c9010b47fcee1d3eb824142e2d633bd4e6.png';
import clashIcon from 'figma:asset/7ee54ba2a1852d65051bf6787db5fa494a8fa1ba.png';
import nbaIcon from 'figma:asset/1fbf6b4a194652072dd780b9916949a9839c17a4.png';
import nflIcon from 'figma:asset/7abaf3fb062d535b8210c91aaf788f5305fd60b2.png';
import animalIcon from 'figma:asset/a37de2083117c329a94890a28a2be90a432b50aa.png';
import foodIcon from 'figma:asset/b5b2cbeb7c4b702df3f756e893f6a6f036d8044d.png';
import brandIcon from 'figma:asset/34dde22e12a16dc48bff95c0cd04a5e0a201a2ae.png';
import hollywoodIcon from 'figma:asset/59c0a4e06b03e790e70b1aefed30d61446132eb2.png';
import musicArtistIcon from 'figma:asset/370f9fb2a3d01ea94bcc93ebc837275d95c7b441.png';
import tvShowIcon from 'figma:asset/b243658522e63b71412aa73b51f21329033922e9.png';
import songIcon from 'figma:asset/eb80d8d62eeb36774902b552cc622063027ca8a4.png';
import celebrityIcon from 'figma:asset/a473cc7860cc803094a14113196b5b8956fb6db1.png';
import gameIcon from 'figma:asset/7d54c12f38138b7c59bb12b63ceda67be7d73a69.png';
import penIcon from 'figma:asset/df93697aa11e7f903d0b6c677396204df4378256.png';

type CategoryIconProps = {
  category?: Category;
  categoryName?: string;
  size?: 'sm' | 'md' | 'lg';
};

export function CategoryIcon({ category, categoryName, size = 'md' }: CategoryIconProps) {
  const sizeClasses = {
    sm: 'text-3xl',
    md: 'text-5xl',
    lg: 'text-6xl'
  };

  const imageSizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  };

  const iconSizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  // Get emoji based on category name
  const getEmojiForName = (name: string): string => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('animal')) return '🐾';
    if (nameLower.includes('food') || nameLower.includes('fruit')) return '🍕';
    if (nameLower.includes('brand')) return '💎';
    if (nameLower.includes('movie') || nameLower.includes('hollywood')) return '🎬';
    if (nameLower.includes('artist') || nameLower.includes('music')) return '🎵';
    if (nameLower.includes('song')) return '🎤';
    if (nameLower.includes('show') || nameLower.includes('tv')) return '📺';
    if (nameLower.includes('celebrit')) return '⭐';
    if (nameLower.includes('country') || nameLower.includes('countries')) return '🌍';
    if (nameLower.includes('sport')) return '⚽';
    if (nameLower.includes('custom')) return '📝';
    return '✨';
  };

  // Determine animation class based on category
  const getAnimationClass = (identifier: string) => {
    const idLower = identifier.toLowerCase();
    if (idLower.includes('animal')) return 'animate-paw-pulse';
    if (idLower.includes('food')) return 'animate-rotate-food';
    if (idLower.includes('brand')) return 'animate-shine';
    if (idLower.includes('movie') || idLower.includes('hollywood')) return 'animate-film-flicker';
    if (idLower.includes('artist') || idLower.includes('song')) return 'animate-music-bounce';
    if (idLower.includes('show')) return 'animate-tv-glow';
    if (idLower.includes('celebrit')) return 'animate-star-twinkle';
    if (idLower.includes('anime') || idLower.includes('clash')) return 'animate-subtle-float';
    if (idLower.includes('nba') || idLower.includes('nfl')) return 'animate-subtle-float';
    return 'animate-subtle-float';
  };

  // Get emoji or render custom icon
  const renderIcon = () => {
    const identifier = category?.id || category?.name || categoryName || '';
    const emoji = category?.emoji || getEmojiForName(identifier);
    
    // Custom image for animal categories
    if (identifier.toLowerCase().includes('animal')) {
      return (
        <img 
          src={animalIcon} 
          alt="Animals" 
          className={`${imageSizeClasses[size]} animate-subtle-float`}
        />
      );
    }

    // Custom image for food categories
    if (identifier.toLowerCase().includes('food')) {
      return (
        <img 
          src={foodIcon} 
          alt="Food" 
          className={`${imageSizeClasses[size]} animate-subtle-float`}
        />
      );
    }

    // Custom image for brand categories
    if (identifier.toLowerCase().includes('brand')) {
      return (
        <img 
          src={brandIcon} 
          alt="Brands" 
          className={`${imageSizeClasses[size]} animate-subtle-float`}
        />
      );
    }

    // Custom image for hollywood/movie categories
    if (identifier.toLowerCase().includes('hollywood') || identifier.toLowerCase().includes('movie')) {
      return (
        <img 
          src={hollywoodIcon} 
          alt="Hollywood" 
          className={`${imageSizeClasses[size]} animate-subtle-float`}
        />
      );
    }

    // Custom image for song categories (check before artist/music)
    if (identifier.toLowerCase().includes('song')) {
      return (
        <img 
          src={songIcon} 
          alt="Popular Songs" 
          className={`${imageSizeClasses[size]} animate-subtle-float`}
        />
      );
    }

    // Custom image for music artist categories
    if (identifier.toLowerCase().includes('artist') || identifier.toLowerCase().includes('music')) {
      return (
        <img 
          src={musicArtistIcon} 
          alt="Music Artists" 
          className={`${imageSizeClasses[size]} animate-subtle-float`}
        />
      );
    }

    // Custom image for TV show categories
    if (identifier.toLowerCase().includes('show') || identifier.toLowerCase().includes('tv')) {
      return (
        <img 
          src={tvShowIcon} 
          alt="TV Shows" 
          className={`${imageSizeClasses[size]} animate-subtle-float`}
        />
      );
    }

    // Custom image for celebrity categories
    if (identifier.toLowerCase().includes('celebrit')) {
      return (
        <img 
          src={celebrityIcon} 
          alt="Celebrities" 
          className={`${imageSizeClasses[size]} animate-subtle-float`}
        />
      );
    }

    // Custom image for video game categories
    if (identifier.toLowerCase().includes('game') || identifier.toLowerCase().includes('video')) {
      return (
        <img 
          src={gameIcon} 
          alt="Video Games" 
          className={`${imageSizeClasses[size]} animate-subtle-float`}
        />
      );
    }

    // Custom image for anime categories
    if (identifier.toLowerCase().includes('anime')) {
      return (
        <img 
          src={animeIcon} 
          alt="Anime" 
          className={`${imageSizeClasses[size]} animate-subtle-float`}
        />
      );
    }

    // Custom image for clash royale categories
    if (identifier.toLowerCase().includes('clash')) {
      return (
        <img 
          src={clashIcon} 
          alt="Clash Royale" 
          className={`${imageSizeClasses[size]} animate-subtle-float`}
        />
      );
    }

    // Custom image for NBA categories
    if (identifier.toLowerCase().includes('nba')) {
      return (
        <img 
          src={nbaIcon} 
          alt="NBA" 
          className={`${imageSizeClasses[size]} animate-subtle-float`}
        />
      );
    }

    // Custom image for NFL categories
    if (identifier.toLowerCase().includes('nfl')) {
      return (
        <img 
          src={nflIcon} 
          alt="NFL" 
          className={`${imageSizeClasses[size]} animate-subtle-float`}
        />
      );
    }

    // Use pen icon for custom categories (fallback for any category without a specific icon)
    return (
      <img 
        src={penIcon} 
        alt="Custom Category" 
        className={`${imageSizeClasses[size]} animate-subtle-float`}
      />
    );
  };

  return (
    <div className="inline-flex items-center justify-center">
      {renderIcon()}
    </div>
  );
}