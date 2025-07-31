#!/bin/bash
cd modules/birads-app
streamlit run birads_app.py --server.port=$PORT --server.address=0.0.0.0
