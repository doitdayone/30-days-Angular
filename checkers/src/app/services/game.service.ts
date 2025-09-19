import { Injectable } from '@angular/core';
import { PostService } from './../../../../infinite-scroll/src/app/services/post.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  // 2D array for 8x8 checkers grid
  board: string[][] = [];
  currentPlayer: string = 'red';
  selectedPiece: { row: number; col: number } | null = null;
  gameOver: boolean = false;

  constructor() {
    this.initializeBoard();
  }

  initializeBoard(): void {
    this.board = Array.from({ length: 8 }, (_, row) =>
      Array.from({ length: 8 }, (_, col) => {
        if (row < 3 && (row + col) % 2 === 1) return 'black';
        if (row > 4 && (row + col) % 2 === 1) return 'red';
        return '';
      })
    );
    this.currentPlayer = 'red'; // Red always starts
    this.selectedPiece = null;
    this.gameOver = false;
  }

  selectPiece(row: number, col: number): boolean {
    // Check if the selected cell belongs to the current player
    if (this.board[row][col].startsWith(this.currentPlayer)) {
      this.selectedPiece = { row, col };
      return true;
    }
    // If the selected cell doesn't belong to the current player, return false
    return false;
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
  }

  private countPieces(color: string): number {
    return this.board.flat().filter((piece) => piece.startsWith(color)).length;
  }

  private checkAllKings(color: string): boolean {
    return (
      this.board
        .flat()
        .filter((piece) => piece.endsWith('king') && piece.startsWith(color))
        .length === this.countPieces(color)
    );
  }

  checkGameOver(): void {
    if (this.countPieces('red') === 0 || this.countPieces('black') === 0) {
      this.gameOver = true;
    }

    if (
      (this.checkAllKings('red') &&
        this.countPieces('red') >= this.countPieces('black')) ||
      (this.checkAllKings('black') &&
        this.countPieces('black') >= this.countPieces('red'))
    ) {
      this.gameOver = true;
    }
  }

  private isValidMove(targetRow: number, targetCol: number): boolean {
    const { row, col } = this.selectedPiece!;
    const piece = this.board[row][col];
    const dx = targetCol - col;
    const dy = targetRow - row;

    // Check if the move is diagonal and the target cell is empty
    if (this.board[targetRow][targetCol] !== '') return false;

    const isKing = piece.includes('king');

    const forwardMove =
      (this.currentPlayer === 'red' && dy === -1) ||
      (this.currentPlayer === 'black' && dy === 1);

    if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
      // King can move both forward and backward
      return isKing || forwardMove;
    }

    // Jump move (capturing eney pieces)
    if (Math.abs(dx) === 2 && Math.abs(dy) === 2) {
      const jumpedRow = (row + targetRow) / 2;
      const jumpedCol = (col + targetCol) / 2;
      return (
        this.board[jumpedRow][jumpedCol] !== '' &&
        !this.board[jumpedRow][jumpedCol].startsWith(this.currentPlayer)
      );
    }
    // If it does not match any of the above conditions
    return false;
  }

  movePiece(targetRow: number, targetCol: number): boolean {
    // if the move is not valid, return false
    if (!this.isValidMove(targetRow, targetCol)) {
      this.selectedPiece = null;
      return false;
    }

    // Get current position of the selected piece
    const { row, col } = this.selectedPiece!;
    const piece = this.board[row][col];

    // Move the piece to the target position
    this.board[row][col] = '';
    this.board[targetRow][targetCol] = piece;

    // Handle jumping (capturing enemy piece)
    if (Math.abs(row - targetRow) === 2) {
      const jumpedRow = (row + targetRow) / 2;
      const jumpedCol = (col + targetCol) / 2;
      // Remove the captured piece
      this.board[jumpedRow][jumpedCol] = '';
    }

    // Handle king promotion (when a piece is on the opposite end)
    if (
      (this.currentPlayer === 'red' && targetRow === 0) ||
      (this.currentPlayer === 'black' && targetRow === 7)
    ) {
      this.board[targetRow][targetCol] = `${this.currentPlayer}-king`;
    }

    // Deselected the piece and switch the player
    this.selectedPiece = null;
    this.switchPlayer();
    this.checkGameOver();
    return true;
  }
}
