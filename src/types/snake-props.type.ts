export interface SnakeProps {
    length: number,
    blockSize: number,
    ctx: CanvasRenderingContext2D,
    gridWidth: number,
    gridHeight: number,
    afterBump: () => void,
}