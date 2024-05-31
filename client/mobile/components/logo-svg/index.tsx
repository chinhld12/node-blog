import React from 'react';
import { useFetchConfigQuery, useFetchConfigSvgQuery } from '@blog/client/web/api';

export default function LogoSvg(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    const { data: config = { siteLogo: '', siteDomain: '' } } = useFetchConfigQuery();
    let url = config.siteLogo;
    if (config.siteLogo.indexOf(config.siteDomain) > 0) {
        url = config.siteLogo.substring(config.siteLogo.indexOf(config.siteDomain) + config.siteDomain.length);
    }
    const { data } = useFetchConfigSvgQuery({
        url,
    });
    return <div dangerouslySetInnerHTML={{ __html: data }} {...props}></div>;
}
