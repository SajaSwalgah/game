import React from 'react';
import Board from './Board.js';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                { squares: Array(9).fill(null) }
            ]
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        console.log('pppppppppp,', this.state.stepNumber);

        console.log('hhhhhhhhh', history);

        const current = history[history.length - 1]
        console.log('cccccccccccc', current);

        const squares = current.squares.slice();
        console.log('sssssssssss', squares);
        const winner = caluclateWinner(squares);
        console.log('wwwwwwwwwwwww, winner');

        if (winner || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'x' : 'O';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step%2) ===0
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const winner = caluclateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to #' + move : 'Start the Game';
            return (
                <li key={move}>
                    <button onClick={() => { this.jumpTo(move) }}>
                        {desc}
                    </button>
                </li>
            )
        });
        let status;
        if (winner) {
            status = "The Winner Is " + winner;
        } else {
            status = 'Next Player Is ' + (this.state.xIsNext ? 'X' : 'O')
        }

        return (
            <>
                <div className="game">
                    <div className="game-board">
                        <Board onClick={(i) => this.handleClick(i)}
                            squares={current.squares} />

                    </div>
                    <div className='game-info'>
                        <div>{status}</div>
                        <ul>{moves}</ul>
                    </div>
                </div>
            </>
        )
    }
}

// helper function to calculate the Winner
function caluclateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a]
        }
    }
    return null;
}

export default Game