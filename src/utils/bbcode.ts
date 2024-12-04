export const bbcodeToHtml = (text: string): string => {
  return text
    .replace(/\[b\](.*?)\[\/b\]/g, '<strong>$1</strong>')
    .replace(/\[i\](.*?)\[\/i\]/g, '<em>$1</em>')
    .replace(/\[u\](.*?)\[\/u\]/g, '<u>$1</u>')
    .replace(/\[color=(.*?)\](.*?)\[\/color\]/g, '<span style="color: $1">$2</span>')
    .replace(/\[size=(.*?)\](.*?)\[\/size\]/g, '<span style="font-size: $1px">$2</span>')
    .replace(/\[center\](.*?)\[\/center\]/g, '<div class="text-center">$1</div>')
    .replace(/\[url=(.*?)\](.*?)\[\/url\]/g, '<a href="$1" class="text-indigo-600 hover:text-indigo-800" target="_blank" rel="noopener noreferrer">$2</a>')
    .replace(/\[img\](.*?)\[\/img\]/g, '<img src="$1" class="max-w-full h-auto rounded-lg" alt="User provided image" />')
    .replace(/\n/g, '<br />');
};