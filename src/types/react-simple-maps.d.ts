declare module 'react-simple-maps' {
  import { ComponentType, SVGProps } from 'react';

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      rotate?: [number, number, number];
    };
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  export interface GeographiesProps {
    geography: string | object | any[];
    children: (geographies: any) => React.ReactNode;
    parseGeographies?: (geographies: any) => any;
  }

  export interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: any;
    onMouseEnter?: (event: React.MouseEvent<SVGPathElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<SVGPathElement>) => void;
    onClick?: (event: React.MouseEvent<SVGPathElement>) => void;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
  }

  export interface MarkerProps {
    coordinates: [number, number];
    children?: React.ReactNode;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
    style?: React.CSSProperties;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const Marker: ComponentType<MarkerProps>;
}

