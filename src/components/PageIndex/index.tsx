import styled from 'styled-components';

const pageBg = require('../../../public/pageBg.png')

export const IndexPageStyle = styled.div`
  height:100vh;
  position: relative;
  overflow: hidden;
  margin: 0px;
  padding: 10px 0 0 0;
  background: url(${pageBg}) center center no-repeat;
  background-size: cover;
`;
export const IndexPageContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  .center-page {
    flex: 1;
  }
`;

export const LeftPage = styled.div`
  min-width: 415px;
  height: auto;
  padding: 0.4rem;
  padding-bottom: 0px;
`;
export const LeftTopBox = styled.div`
  position: relative;
  height: 4.375rem;
  width: 100%;
  .left-top-borderBox12 {
    width: inherit;
    height: inherit;
    padding: 0.1875rem;
    .left-top {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.6);
      .title-dis {
        margin-top: 0.1875rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 0.2rem;
        color: #c0c9d2;
        &-keyword {
          padding-left: 0.125rem;
          color: #47dae8;
        }
      }
    }
  }
`;
export const LeftBottomBox = styled.div`
  position: relative;
  margin-top: 0.25rem;
  height: 7.75rem;
  width: 100%;
  .left-bottom-borderBox13 {
    width: inherit;
    height: inherit;
    padding: 0.25rem 0.1875rem;
    .left-bottom {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.6);
    }
  }
`;

export const RightPage = styled.div`
  width: 6.25rem;
  height: auto;
  padding: 0px 0.2rem;
`;

export const RightTopBox = styled.div`
  position: relative;
  height: 3rem;
  width: 100%;
  margin-bottom: 0.25rem;
  .right-top {
    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.1875rem;
    }
    .earth-gif {
      width: 2.75rem;
      height: auto;
      border-radius: 50%;
      overflow: hidden;
    }
  }
`;

export const RightCenterBox = styled.div`
  position: relative;
  height: 3.125rem;
  width: 100%;
  margin-bottom: 0.25rem;
`;

export const RightBottomBox = styled.div`
  position: relative;
  height: 6rem;
  width: 100%;
  .right-bottom-borderBox13 {
    padding: 0.25rem 0.1875rem 0.1875rem;
    .right-bottom {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.6);
      .feedback-box {
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        &-item {
          display: flex;
          align-items: center;
          flex-direction: column;
          height: 1.75rem;
          .dis-text {
            font-weight: bold;
            margin-top: 0.0625rem;
            color: #b2cfee;
            font-size: 0.2rem;
            background: linear-gradient(to bottom, #fff, #6176F4);
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
          }
        }
      }
      .offline-portal-box {
        margin-top: 0.125rem;
      }
    }
  }
`;
