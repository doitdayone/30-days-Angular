import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.scss',
})
export class TicTacToeComponent {
  board: string[] = Array(9).fill('');
  currentPlayer: string = 'X';
  winner: string | null = null;
  isDraw: boolean = false;
  private firstPlayer: string = 'X';

  private isCellOcupied(index: number): boolean {
    return this.board[index] !== '';
  }

  private isGameOver(): boolean {
    return this.winner !== null || this.isDraw;
  }

  private isMoveInvalid(index: number): boolean {
    return this.isCellOcupied(index) || this.isGameOver();
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  checkWinner(): boolean {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombinations.some(
      ([a, b, c]) =>
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
    );
  }

  private isBoardFull(): boolean {
    return this.board.every((cell) => cell !== '');
  }

  private updateGameState(index: number): void {
    if (this.checkWinner()) {
      this.winner = this.currentPlayer;
    } else if (this.isBoardFull()) {
      this.isDraw = true;
    } else {
      this.switchPlayer();
    }
  }

  makeMove(index: number): void {
    if (this.isMoveInvalid(index)) return;
    this.board[index] = this.currentPlayer;
    this.updateGameState(index);
  }

  resetGame(): void {
    this.board = Array(9).fill('');
    this.firstPlayer = this.firstPlayer === 'X' ? 'O' : 'X';
    this.currentPlayer = this.firstPlayer;
    this.winner = null;
    this.isDraw = false;
  }
}
