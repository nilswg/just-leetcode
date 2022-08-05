use std::time::{Duration, Instant};

pub struct Solution {}
impl Solution {
    pub fn solve_sudoku(board: &mut Vec<Vec<char>>) {
        let mut rows = vec![vec![0; 9]; 9];
        let mut cols = vec![vec![0; 9]; 9];
        let mut boxs = vec![vec![0; 9]; 9];
        let mut empties = vec![];

        for ri in 0..9 {
            for ci in 0..9 {
                //get index of each box
                let bi = ri / 3 * 3 + ci / 3;

                if board[ri][ci] != '.' {
                    if let Some(val) = board[ri][ci].to_digit(10) {
                        let i = (val - 1) as usize;
                        rows[ri][i] = 1;
                        cols[ci][i] = 1;
                        boxs[bi][i] = 1;
                    }
                } else {
                    empties.push((ri, ci, bi));
                }
            }
        }

        Solution::traverse(board, &mut rows, &mut cols, &mut boxs, &mut empties);
    }

    pub fn traverse(
        board: &mut Vec<Vec<char>>,
        rows: &mut Vec<Vec<i32>>,
        cols: &mut Vec<Vec<i32>>,
        boxs: &mut Vec<Vec<i32>>,
        empties: &mut Vec<(usize, usize, usize)>
    ) -> bool {
        if empties.is_empty() {
            return true;
        }

        let (ri, ci, bi) = empties[empties.len() - 1];

        for i in 0..9 {
            if (rows[ri][i] > 0 || cols[ci][i] > 0 || boxs[bi][i] > 0) == false {
                if let Some(val) = char::from_digit((i + 1) as u32, 10) {
                    board[ri][ci] = val;
                    rows[ri][i] = 1;
                    cols[ci][i] = 1;
                    boxs[bi][i] = 1;
                }

                if let Some(pre) = empties.pop() {
                    if Solution::traverse(board, rows, cols, boxs, empties) {
                        return true;
                    }

                    board[ri][ci] = '.';
                    rows[ri][i] = 0;
                    cols[ci][i] = 0;
                    boxs[bi][i] = 0;
                    empties.push(pre);
                }
            }
        }

        return false;
    }
}
#[allow(dead_code)]
pub fn main() {
    println!("Start p0037_sudoku_solver testing...");

    let start = Instant::now();
    let mut board_9x9 = vec![
        vec!['5', '3', '.', '.', '7', '.', '.', '.', '.'],
        vec!['6', '.', '.', '1', '9', '5', '.', '.', '.'],
        vec!['.', '9', '8', '.', '.', '.', '.', '6', '.'],
        vec!['8', '.', '.', '.', '6', '.', '.', '.', '3'],
        vec!['4', '.', '.', '8', '.', '3', '.', '.', '1'],
        vec!['7', '.', '.', '.', '2', '.', '.', '.', '6'],
        vec!['.', '6', '.', '.', '.', '.', '2', '8', '.'],
        vec!['.', '.', '.', '4', '1', '9', '.', '.', '5'],
        vec!['.', '.', '.', '.', '8', '.', '.', '7', '9'],
    ];
    Solution::solve_sudoku(&mut board_9x9);
    println!("board_9x9:\n {:?}", &board_9x9);
    println!(
        "Time elapsed in expensive_function() is: {:?}",
        start.elapsed()
    );
    let expect = [
        ['5', '3', '4', '6', '7', '8', '9', '1', '2'],
        ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
        ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
        ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
        ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
        ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
        ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
        ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
        ['3', '4', '5', '2', '8', '6', '1', '7', '9'],
    ];
    println!("board_9x9 == expect {}", board_9x9 == expect);

    // let start = Instant::now();
    // let mut board_16x16 = vec![vec!['.'; 16]; 16];
    // Solution::solve_sudoku(&mut board_16x16);
    // println!("board_16x16:\n {:?}", &board_16x16);
    // println!(
    //     "Time elapsed in expensive_function() is: {:?}",
    //     start.elapsed()
    // );

    println!("All Testing Passed ✅");
}
