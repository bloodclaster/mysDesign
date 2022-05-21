import Normal from "@/components/CreateCharts/EditorChart/Normal"
import { BorderBox12, BorderBox13 } from '@jiaminghi/data-view-react';
import { IndexPageContent, IndexPageStyle, LeftPage, LeftTopBox } from "@/components/PageIndex"
import styles from './index.less'
import Increase from "@/components/CreateCharts/EditorChart/Increase";

export default ({ }) => {



  
  return (<div>
    <IndexPageStyle>
      <IndexPageContent>
        <LeftPage>
          <BorderBox12 style={{ height: 315, width: 425 }}>
            <LeftTopBox className={styles.iconfont}>
              <div style={{ height: 315, width: 415, marginTop: 3 }}>
                <Increase id={'1'}
                  data={[{
                    name: 'nale',
                    data: [
                      ['2016-8-10', 256],
                      ['2016-8-11', 556],
                      ['2016-8-12', 756],
                      ['2016-8-13', 550],
                      ['2016-8-14', 210],
                      ['2016-8-15', 310],
                      ['2016-8-16', 414],
                      ['2016-8-17', 304],
                      ['2016-8-18', 104],
                      ['2016-10-10', 100],
                      ['2016-10-11', 120],
                      ['2016-10-12', 123],
                      ['2016-10-13', 523],
                      ['2016-10-14', 223],
                      ['2016-10-15', 343],
                      ['2016-10-16', 440],
                      ['2016-10-17', 540],
                      ['2016-10-18', 500],
                      ['2017-10-10', 200],
                      ['2017-10-11', 560],
                      ['2017-10-12', 750],
                      ['2017-10-13', 580],
                      ['2017-10-14', 250],
                      ['2017-10-15', 300],
                      ['2017-10-16', 450],
                      ['2017-10-17', 300],
                      ['2017-10-18', 100],
                    ]
                  }]} yAxisName={'asd'} stack={true} zoomTool />
              </div>
            </LeftTopBox>
          </BorderBox12>
        </LeftPage>
      </IndexPageContent>
    </IndexPageStyle>
  </div>)
}