import {
    entryReducer,
    entryState,
    entryWatcherSagas
} from './front/entry'

/***
 * ///////////////////////////////////////////////
 * REDUCKSメインファイル 🦆
 * ---------------------------
 *
 * これは、reduxの子グループを束ねるreducksのメインファイルです。
 * これで、ステイツ、リデューサー、レドゥーサガが結ばれる。
 *
 * reducksの詳細と、新しいreduxグループの追加については、以下のリンクをご参照ください。
 * reducksのテンプレート化の例 :  https://github.com/alexnm/re-ducks#enter-re-ducks
 * //////////////////////////////////////////////
 */
import {all, call, spawn} from 'redux-saga/effects';


/**
 * すべての子のreduxステートを束ねる
 */
export const StoreState = {
    entryState: entryState,
};

/**
 * すべてのリデューサーイベントを束ねる
 */
export const reducers = {
    entryReducer
};

/**
 * すべてのサガ・ウォッチャーを束ね、束ねられたウォッチャーの呼び出しに成功した場合、グローバル・キャッチを設定します。
 */
export function* rootSaga() {
    const watchers = [
        ...entryWatcherSagas
    ];

    yield all(
        watchers.map((saga) =>
            spawn(function* () {
                while (true) {
                    try {
                        yield call(saga);
                        break;
                    } catch (ex) {
                        console.log(ex);
                    }
                }
            }),
        ),
    );
}
