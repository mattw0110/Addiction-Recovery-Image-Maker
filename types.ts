export interface GeneratedContent {
  title: string;
  caption: string;
  imagePrompt: string;
}

export interface GeneratedImage {
  url: string;
  mimeType: string;
}

export interface GenerationResult {
  content: GeneratedContent;
  image: GeneratedImage;
}

export enum GenerationState {
  IDLE = 'IDLE',
  GENERATING_TEXT = 'GENERATING_TEXT',
  GENERATING_IMAGE = 'GENERATING_IMAGE',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface ThemeOption {
  id: string;
  label: string;
  description: string;
}